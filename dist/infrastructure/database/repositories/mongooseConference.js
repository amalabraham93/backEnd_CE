"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ConferenceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    organizations: { type: mongoose_2.Schema.Types.ObjectId, ref: "Organization" },
    location: { type: String },
    type: { type: String },
    users: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "user" }],
    banner: { type: String, default: "unsplash_6vajp0pscx0.jpeg" },
    reviewers: [
        {
            email: { type: String },
            password: { type: String },
        },
    ],
    paperSubmissionPrice: { type: Number, default: 0 },
    bookingPrice: { type: Number, default: 0 },
    schedule: [
        {
            date: { type: Date, required: true },
            sessions: [
                {
                    time: { type: String, required: true },
                    authorName: { type: String, required: true },
                    paperName: { type: String, required: true },
                },
            ],
        },
    ],
});
const ConferenceModel = mongoose_1.default.model("Conference", ConferenceSchema);
class MongooseConferenceRepository {
    async create(conference) {
        const createConference = await ConferenceModel.create(conference);
        return createConference.toObject();
    }
    async update(id, name, startDate, endDate) {
        const conference = await ConferenceModel.findByIdAndUpdate(id, {
            name: name,
            startDate: startDate,
            endDate: endDate,
            // Update other fields as needed
        }, { new: true }).exec();
        return conference.toObject();
    }
    delete(conference) {
        throw new Error("Method not implemented.");
    }
    async getById(id) {
        const conference = await ConferenceModel.findById(id)
            .populate("users")
            .exec();
        return conference ? conference.toObject() : null;
    }
    async getAll() {
        const conferences = await ConferenceModel.find({}).sort({ startDate: 1 });
        return conferences.map((conference) => conference.toObject());
    }
    async getByOrganizerId(organizations) {
        const conferences = await ConferenceModel.find({
            organizations: organizations,
        }).exec();
        return conferences.map((conference) => conference.toObject());
    }
    async registerConfUser(userId, confId) {
        const conference = await ConferenceModel.findByIdAndUpdate(confId, {
            $push: { users: userId },
        });
        return conference.toObject();
    }
    async addReviewer(email, confId, password) {
        const addReviewer = await ConferenceModel.findByIdAndUpdate(confId, {
            $push: { reviewers: { email: email, password: password } },
        });
    }
    async reviewerLogin(rEmail, confId, rPassword) {
        const conference = await ConferenceModel.findOne({
            _id: confId,
            "reviewers.email": rEmail,
            "reviewers.password": rPassword,
        });
    }
    async getByUserId(userId) {
        const conferences = await ConferenceModel.find({ users: userId }).exec();
        return conferences.map((conference) => conference.toObject());
    }
    async addSessionToSchedule(confId, sessionDate, session) {
        const existingConference = await ConferenceModel.findOne({
            _id: confId,
            "schedule.date": sessionDate,
        });
        if (existingConference) {
            // Date exists, push session to existing entry
            await ConferenceModel.updateOne({ _id: confId, "schedule.date": sessionDate }, { $push: { "schedule.$.sessions": session } });
        }
        else {
            // Date does not exist, create new entry
            await ConferenceModel.updateOne({ _id: confId }, { $push: { schedule: { date: sessionDate, sessions: [session] } } });
        }
        const updatedConference = await ConferenceModel.findById(confId);
        return updatedConference.toObject();
    }
    async getConferenceSchedule(confId) {
        const conference = await ConferenceModel.findById(confId).exec();
        return conference ? conference.schedule : [];
    }
}
exports.default = MongooseConferenceRepository;
