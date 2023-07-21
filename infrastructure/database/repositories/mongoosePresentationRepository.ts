import mongoose, {Types, ObjectId, Schema } from "mongoose";
import Presentation from "../../../domain/entities/presentation";
import PresentationRepository from "../../../domain/repositories/presentationRepository";

const PresentationSchema = new mongoose.Schema({
  stream_key: { type: String, required: true },
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  papers: [{ type: Schema.Types.ObjectId, ref: "Paper", default: null }],
  conference: {
    type: Schema.Types.ObjectId,
    ref: "Conference",
    required: true,
  },
  authors: [{ type: Schema.Types.ObjectId, ref: "Author", default: null }],
});

const PresentationModel = mongoose.model<Presentation>(
  "Presentation",
  PresentationSchema
);

class MongoosePresentationRepository implements PresentationRepository {


  
  async createPresentation(presentation: Presentation): Promise<Presentation> {
    const { conference } = presentation;
  
    try {
      // Try to find an existing presentation with the same conferenceId
      let existingPresentation = await PresentationModel.findOne({ conference });
  
      if (existingPresentation) {
        // If an existing presentation is found, update it with the new data
        existingPresentation = await PresentationModel.findOneAndUpdate(
          { conference },
          presentation,
          { new: true } // Setting "new" to true returns the updated document
        );
        return existingPresentation!.toObject();
      } else {
        // If no existing presentation is found, create a new one
        const createdPresentation = await PresentationModel.create(presentation);
        return createdPresentation.toObject();
      }
    } catch (error) {
      // Handle errors
      throw new Error("Error creating/updating presentation");
    }
  }




  async getPresentationById(_id: ObjectId): Promise<Presentation | null> {
    const foundPresentation = await PresentationModel.findById(_id).exec();
    return foundPresentation ? foundPresentation.toObject() : null;
  }

  async updatePresentation(presentation: Presentation): Promise<Presentation> {
    const updatedPresentation = await PresentationModel.findByIdAndUpdate(
      presentation._id,
      presentation,
      { new: true }
    ).exec();
    return updatedPresentation!.toObject();
  }

  async deletePresentation(_id: ObjectId): Promise<void> {
    await PresentationModel.findByIdAndDelete(_id).exec();
  }

  async getAllPresentations(): Promise<Presentation[]> {
    const presentations = await PresentationModel.find({}).exec();
    return presentations.map((presentation) => presentation.toObject());
  }

  async getPresentationsByConferenceId(
    conferenceId: Types.ObjectId
  ): Promise<Presentation[]> {
    const presentations = await PresentationModel.find({
      conference: conferenceId,
    }).sort({ start_time: -1 }).limit(1).exec();
    return presentations.map((presentation) => presentation.toObject());
  }

  async getPresentationsByAuthorId(
    authorId: ObjectId
  ): Promise<Presentation[]> {
    const presentations = await PresentationModel.find({
      authors: authorId,
    }).exec();
    return presentations.map((presentation) => presentation.toObject());
  }
}

export default MongoosePresentationRepository;
