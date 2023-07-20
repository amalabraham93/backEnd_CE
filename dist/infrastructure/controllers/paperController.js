"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class PaperController {
    createPaper;
    paperRepository;
    userRepository;
    getPaperByConfId;
    getPaperByUserId;
    getPaperById;
    updateAccepted;
    constructor(createPaper, paperRepository, userRepository, getPaperByConfId, getPaperByUserId, getPaperById, updateAccepted) {
        this.createPaper = createPaper;
        this.paperRepository = paperRepository;
        this.userRepository = userRepository;
        this.getPaperByConfId = getPaperByConfId;
        this.getPaperByUserId = getPaperByUserId;
        this.getPaperById = getPaperById;
        this.updateAccepted = updateAccepted;
        this.createPaperHandler = this.createPaperHandler.bind(this);
        this.getPaperByConfIdHandler = this.getPaperByConfIdHandler.bind(this);
        this.getPaperByUserIdHandler = this.getPaperByUserIdHandler.bind(this);
        this.getPaperByIdHandler = this.getPaperByIdHandler.bind(this);
        this.updateAcceptedHandler = this.updateAcceptedHandler.bind(this);
    }
    async createPaperHandler(req, res) {
        try {
            const { name, submissionTitle, abstract, author, affiliation, userId, date, } = req.body;
            const confId = new mongoose_1.Types.ObjectId(req.params.confId);
            // Retrieve the user by email or any other identifier
            const user = await this.userRepository.getUserByEmail(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            const users = [user._id];
            // Create the paper
            const newPaper = await this.createPaper.execute(name, submissionTitle, users, userId, affiliation, confId, date, abstract);
            res.status(201).json(newPaper);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async getPaperByConfIdHandler(req, res) {
        try {
            const confId = new mongoose_1.Types.ObjectId(req.params.confId);
            const paper = await this.getPaperByConfId.execute(confId);
            res.status(200).json({ paper });
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving conferences by  ID" });
        }
    }
    async getPaperByUserIdHandler(req, res) {
        try {
            const cookie = req.cookies["jwt-user"];
            const claims = jsonwebtoken_1.default.verify(cookie, "your-secret-key");
            const userId = claims.userId;
            const user = await this.userRepository.getUserById(userId);
            const paper = await this.getPaperByUserId.execute(user.email);
            res.status(200).json({ paper });
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving conferences by  ID" });
        }
    }
    async getPaperByIdHandler(req, res) {
        try {
            const paperId = new mongoose_1.Types.ObjectId(req.params.paperId);
            const paper = await this.getPaperById.execute(paperId);
            res.status(200).json({ paper });
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving conferences by  ID" });
        }
    }
    async updateAcceptedHandler(req, res) {
        try {
            const paperId = new mongoose_1.Types.ObjectId(req.params.paperId);
            const approved = req.body.approved;
            const paper = await this.updateAccepted.execute(paperId, approved);
            if (paper) {
                res.status(200).json({ paper });
            }
            else {
                res.status(500).json({ message: "Error updating paper" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error updating paper" });
        }
    }
}
exports.default = PaperController;
