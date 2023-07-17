import Paper from "'../../domain/entities/paper";
import PaperRepository from "'../../domain/repositories/paperRepository";
import mongoose, { Schema, Document, ObjectId, Types } from "mongoose";

// interface IPaperModel extends Document, Paper {}

const PaperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  submissionTitle: { type: String, required: true },
  abstract: { type: String, required: true },
  author: [{ type: String }],
  approved: { type: Boolean, default: null },
  affiliation: { type: String },
  date: { type: Date },
  conference: { type: Schema.Types.ObjectId, ref: "Conference" },
});

const PaperModel = mongoose.model("Paper", PaperSchema);

class MongoosePaperRepository implements PaperRepository {
  async create(paper: Paper): Promise<Paper> {
    const createdPaper = await PaperModel.create(paper);
    return createdPaper.toObject() as Paper;
  }

  update(paper: Paper): Promise<Paper> {
    throw new Error("Method not implemented.");
  }

  delete(paper: Paper): Promise<Paper> {
    throw new Error("Method not implemented.");
  }

  async getById(id: Types.ObjectId): Promise<Paper | null> {
    const paper = await PaperModel.findById(id).populate("conference").exec();

    return paper ? paper.toObject() : null;
  }

  getAll(): Promise<Paper[]> {
    throw new Error("Method not implemented.");
  }

  async updateAccepted(
    paperId: Types.ObjectId,
    approved: boolean
  ): Promise<Paper | null> {
    const updatedPaper = await PaperModel.findByIdAndUpdate(
      paperId,
      { approved },
      { new: true }
    ).exec();
    return updatedPaper ? updatedPaper.toObject() : null;
  }

  async getByConferenceId(
    conference: mongoose.Types.ObjectId
  ): Promise<Paper[]> {
    const papers = await PaperModel.find({ conference: conference }).populate("conference").exec();
    return papers.map((paper) => paper.toObject()) as Paper[];
  }

  async getByUserId(userId: string): Promise<Paper[]> {
    const papers = await PaperModel.find({ author: userId }).exec();
    return papers.map((paper) => paper.toObject()) as Paper[];
  }
}

export default MongoosePaperRepository;
