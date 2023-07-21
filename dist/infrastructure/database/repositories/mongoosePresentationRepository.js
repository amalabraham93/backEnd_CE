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
const PresentationSchema = new mongoose_1.default.Schema({
    stream_key: { type: String, required: true },
    start_time: { type: Date, default: Date.now },
    end_time: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    papers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Paper", default: null }],
    conference: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Conference",
        required: true,
    },
    authors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Author", default: null }],
});
const PresentationModel = mongoose_1.default.model("Presentation", PresentationSchema);
class MongoosePresentationRepository {
    async createPresentation(presentation) {
        const createdPresentation = await PresentationModel.create(presentation);
        return createdPresentation.toObject();
    }
    async getPresentationById(_id) {
        const foundPresentation = await PresentationModel.findById(_id).exec();
        return foundPresentation ? foundPresentation.toObject() : null;
    }
    async updatePresentation(presentation) {
        const updatedPresentation = await PresentationModel.findByIdAndUpdate(presentation._id, presentation, { new: true }).exec();
        return updatedPresentation.toObject();
    }
    async deletePresentation(_id) {
        await PresentationModel.findByIdAndDelete(_id).exec();
    }
    async getAllPresentations() {
        const presentations = await PresentationModel.find({}).exec();
        return presentations.map((presentation) => presentation.toObject());
    }
    async getPresentationsByConferenceId(conferenceId) {
        const presentations = await PresentationModel.find({
            conference: conferenceId,
        }).sort({ start_time: -1 }).limit(1).exec();
        return presentations.map((presentation) => presentation.toObject());
    }
    async getPresentationsByAuthorId(authorId) {
        const presentations = await PresentationModel.find({
            authors: authorId,
        }).exec();
        return presentations.map((presentation) => presentation.toObject());
    }
}
exports.default = MongoosePresentationRepository;
