import Paper from "domain/entities/paper";
import PaperRepository from "domain/repositories/paperRepository";
import mongoose, { Schema, Document } from "mongoose";

interface IPaperModel extends Document, Paper {}

const PaperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  submissionTitle:{type:String, required:true},
  abstract: { type: String, required: true },
  author: [{ type: String }],
  affiliation: { type: String },
  date: { type: Date },
  conference: { type: Schema.Types.ObjectId, ref: 'Conference' },
});

const PaperModel = mongoose.model<IPaperModel>("Paper", PaperSchema);

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

  getById(id: string): Promise<Paper> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Paper[]> {
    throw new Error("Method not implemented.");
  }

  async getByConferenceId(conference: mongoose.Types.ObjectId): Promise<Paper[]> {
    const papers = await PaperModel.find({ conference: conference }).exec();
    return papers.map(paper => paper.toObject()) as Paper[];
  }

  getByUserId(userId: mongoose.Types.ObjectId): Promise<Paper> {
    throw new Error("Method not implemented.");
  }
}

export default MongoosePaperRepository;
