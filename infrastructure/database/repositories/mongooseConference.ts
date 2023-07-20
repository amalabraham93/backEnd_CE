import mongoose, { Types } from "mongoose";
import Conference,{ScheduleDate,Session} from "../../../domain/entities/conference";
import ConferenceRepository from "domain/repositories/conferenceRepository";
import { Schema, ObjectId } from "mongoose";



const ConferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  organizations: { type: Schema.Types.ObjectId, ref: "Organization" },
  location: { type: String },
  type: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
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

const ConferenceModel = mongoose.model("Conference", ConferenceSchema);

class MongooseConferenceRepository implements ConferenceRepository {
  async create(conference: Conference): Promise<Conference> {
    const createConference = await ConferenceModel.create(conference);
    return createConference.toObject();
  }

  async update(
    id: Object,
    name: string,
    startDate: Date,
    endDate: Date
  ): Promise<Conference> {
    const conference = await ConferenceModel.findByIdAndUpdate(
      id,
      {
        name: name,
        startDate: startDate,
        endDate: endDate,
        // Update other fields as needed
      },
      { new: true }
    ).exec();
    return conference!.toObject();
  }

  delete(conference: Conference): Promise<Conference> {
    throw new Error("Method not implemented.");
  }

  async getById(id: Types.ObjectId): Promise<Conference | null> {
    const conference = await ConferenceModel.findById(id)
      .populate("users")
      .exec();
    return conference ? conference.toObject() : null;
  }

  async getAll(): Promise<Conference[]> {
    const conferences = await ConferenceModel.find({}).sort({ startDate: 1 });
    return conferences.map((conference) => conference.toObject());
  }

  async getByOrganizerId(organizations: Types.ObjectId): Promise<Conference[]> {
    const conferences = await ConferenceModel.find({
      organizations: organizations,
    }).exec();
    return conferences.map((conference) => conference.toObject());
  }

  async registerConfUser(
    userId: ObjectId,
    confId: Types.ObjectId
  ): Promise<void> {
    const conference = await ConferenceModel.findByIdAndUpdate(confId, {
      $push: { users: userId },
    });
    return conference!.toObject();
  }

  async addReviewer(
    email: string,
    confId: Types.ObjectId,
    password: string
  ): Promise<void> {
    const addReviewer = await ConferenceModel.findByIdAndUpdate(confId, {
      $push: { reviewers: { email: email, password: password } },
    });
  }

  async reviewerLogin(
    rEmail: string,
    confId: Types.ObjectId,
    rPassword: string
  ): Promise<void> {
    const conference = await ConferenceModel.findOne({
      _id: confId,
      "reviewers.email": rEmail,
      "reviewers.password": rPassword,
    });
  }

  async getByUserId(userId: ObjectId): Promise<Conference[]> {
    const conferences = await ConferenceModel.find({ users: userId }).exec();
    return conferences.map((conference) => conference.toObject());
  }

  async addSessionToSchedule(
    confId: Types.ObjectId,
    sessionDate: Date,
    session: Session
  ): Promise<void> {

    const existingConference = await ConferenceModel.findOne({
      _id: confId,
      "schedule.date": sessionDate,
    });
  
    if (existingConference) {
      // Date exists, push session to existing entry
      await ConferenceModel.updateOne(
        { _id: confId, "schedule.date": sessionDate },
        { $push: { "schedule.$.sessions": session } }
      );
    } else {
      // Date does not exist, create new entry
      await ConferenceModel.updateOne(
        { _id: confId },
        { $push: { schedule: { date: sessionDate, sessions: [session] } } }
      );
    }
  
    const updatedConference = await ConferenceModel.findById(confId);
  
    return updatedConference!.toObject() 
  }


  async getConferenceSchedule(confId: Types.ObjectId): Promise<ScheduleDate[]> {
    const conference = await ConferenceModel.findById(confId).exec();
    return conference ? conference.schedule : [];
  }
}

export default MongooseConferenceRepository;
