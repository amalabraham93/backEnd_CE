"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// interface IPaperModel extends Document, Paper {}
const PaperSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    submissionTitle: { type: String, required: true },
    abstract: { type: String, required: true },
    author: [{ type: String }],
    approved: { type: Boolean, default: null },
    affiliation: { type: String },
    date: { type: Date },
    conference: { type: mongoose_1.Schema.Types.ObjectId, ref: "Conference" },
});
const PaperModel = mongoose_1.default.model("Paper", PaperSchema);
class MongoosePaperRepository {
    async create(paper) {
        const createdPaper = await PaperModel.create(paper);
        return createdPaper.toObject();
    }
    update(paper) {
        throw new Error("Method not implemented.");
    }
    delete(paper) {
        throw new Error("Method not implemented.");
    }
    async getById(id) {
        const paper = await PaperModel.findById(id).populate("conference").exec();
        return paper ? paper.toObject() : null;
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    async updateAccepted(paperId, approved) {
        const updatedPaper = await PaperModel.findByIdAndUpdate(paperId, { approved }, { new: true }).exec();
        return updatedPaper ? updatedPaper.toObject() : null;
    }
    async getByConferenceId(conference) {
        const papers = await PaperModel.find({ conference: conference })
            .populate("conference")
            .exec();
        return papers.map((paper) => paper.toObject());
    }
    async getByUserId(userId) {
        const papers = await PaperModel.find({ author: userId }).exec();
        return papers.map((paper) => paper.toObject());
    }
}
exports.default = MongoosePaperRepository;
