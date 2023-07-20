"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
class ConferenceController {
    createConference;
    getAllConfByOrg;
    getConfById;
    getAllConf;
    resgisterConfUser;
    userRepository;
    addReviewer;
    reviewerLogin;
    getConfByUserId;
    updateConference;
    addSession;
    constructor(createConference, getAllConfByOrg, getConfById, getAllConf, resgisterConfUser, userRepository, addReviewer, reviewerLogin, getConfByUserId, updateConference, addSession) {
        this.createConference = createConference;
        this.getAllConfByOrg = getAllConfByOrg;
        this.getConfById = getConfById;
        this.getAllConf = getAllConf;
        this.resgisterConfUser = resgisterConfUser;
        this.addReviewer = addReviewer;
        this.userRepository = userRepository;
        this.reviewerLogin = reviewerLogin;
        this.getConfByUserId = getConfByUserId;
        this.updateConference = updateConference;
        this.addSession = addSession;
        this.CreateConferenceHandler = this.CreateConferenceHandler.bind(this);
        this.getConferencesByOrganizerIdHandler =
            this.getConferencesByOrganizerIdHandler.bind(this);
        this.getConfByIdHandler = this.getConfByIdHandler.bind(this);
        this.getAllConferenceHandler = this.getAllConferenceHandler.bind(this);
        this.registerConfUserHandler = this.registerConfUserHandler.bind(this);
        this.addReviewerHandler = this.addReviewerHandler.bind(this);
        this.reviewerLoginHandler = this.reviewerLoginHandler.bind(this);
        this.getConferencesByUserIdHandler =
            this.getConferencesByUserIdHandler.bind(this);
        this.updateConferenceHandler = this.updateConferenceHandler.bind(this);
        this.addSessionHandler = this.addSessionHandler.bind(this);
    }
    async CreateConferenceHandler(req, res) {
        try {
            const { name, startDate } = req.body;
            const token = req.headers.authorization;
            if (!token || !token.startsWith('Bearer ')) {
                res.json({ unauthenticated: true });
            }
            const tokenWithoutBearer = token.slice(7);
            const claims = jsonwebtoken_1.default.verify(tokenWithoutBearer, "your-secret-key");
            const orgid = claims._id;
            const conference = await this.createConference.execute(name, startDate, orgid);
            res.status(201).json(conference);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async getConferencesByOrganizerIdHandler(req, res) {
        // const { organizerId } = req.params;
        const cookie = req.headers.authorization;
        const claims = jsonwebtoken_1.default.verify(cookie, "your-secret-key");
        const orgid = claims._id;
        try {
            const conferences = await this.getAllConfByOrg.execute(orgid);
            res.status(200).json({ conferences });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error retrieving conferences by organizer ID" });
        }
    }
    async getConferencesByUserIdHandler(req, res) {
        // const { organizerId } = req.params;
        const cookie = req.headers.authorization;
        const claims = jsonwebtoken_1.default.verify(cookie, "your-secret-key");
        const userId = claims.userId;
        try {
            const conferences = await this.getConfByUserId.execute(userId);
            res.status(200).json({ conferences });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error retrieving conferences by organizer ID" });
        }
    }
    async getConfByIdHandler(req, res) {
        const paramId = req.params.confId;
        const confId = new mongoose_1.Types.ObjectId(paramId);
        try {
            const conferences = await this.getConfById.execute(confId);
            res.status(200).json({ conferences });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving conferences by  ID" });
        }
    }
    async getAllConferenceHandler(req, res) {
        try {
            const conferences = await this.getAllConf.execute();
            res.status(200).json({ conferences });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving conferences by  ID" });
        }
    }
    async registerConfUserHandler(req, res) {
        try {
            const { fullName, email } = req.body;
            const id = new mongoose_1.Types.ObjectId(req.params.id);
            const findUser = await this.userRepository.getUserByEmail(email);
            const userId = findUser?._id;
            const user = await this.resgisterConfUser.execute(userId, id);
            res.status(200).json({ user });
        }
        catch (error) {
            res.status(500).json({ message: "Error registering user" });
        }
    }
    async addReviewerHandler(req, res) {
        try {
            const { email } = req.body;
            const confId = new mongoose_1.Types.ObjectId(req.body.confId);
            function generateRandomPassword(length = 8) {
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let password = "";
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    password += characters.charAt(randomIndex);
                }
                return password;
            }
            const password = generateRandomPassword();
            const addReviewer = await this.addReviewer.execute(email, confId, password);
            res.status(200).json({ message: "Reviewer added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding reviewer" });
        }
    }
    async reviewerLoginHandler(req, res) {
        try {
            const { rEmail, rPassword } = req.body;
            const confId = new mongoose_1.Types.ObjectId(req.body.confId);
            // Call the reviewer login use case or repository method
            await this.reviewerLogin.execute(rEmail, confId, rPassword);
            // Reviewer login successful
            // Perform necessary actions (e.g., generate authentication token, set cookies, etc.)
            res.status(200).json({ message: "Reviewer login successful" });
        }
        catch (error) {
            // Reviewer login failed
            // Perform necessary error handling
            res.status(500).json({ message: "Reviewer login failed" });
        }
    }
    async updateConferenceHandler(req, res) {
        try {
            const { name, startDate, endDate } = req.body;
            const id = new mongoose_1.Types.ObjectId(req.params.id);
            const conference = await this.updateConference.execute(id, name, startDate, endDate);
            res.status(201).json(conference);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async addSessionHandler(req, res) {
        try {
            // Extract data from request body
            const { sessionDate, session } = req.body;
            const confId = new mongoose_1.Types.ObjectId(req.body.confId);
            // Add the session to the conference using the AddSessionUseCase
            await this.addSession.execute(confId, sessionDate, session);
            res.status(200).json({ message: "Session added successfully" });
        }
        catch (error) {
            console.error("Error adding session to conference:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.default = ConferenceController;
