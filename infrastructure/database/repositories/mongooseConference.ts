import mongoose, { Types } from "mongoose";
import Conference from "domain/entities/conference";
import ConferenceRepository from "domain/repositories/conferenceRepository";
import { Schema ,ObjectId} from "mongoose";


const ConferenceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    organizations: { type: Schema.Types.ObjectId, ref: 'Organization' },
    location: { type: String },
    type: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    banner: { type: String, default: 'unsplash_6vajp0pscx0.jpeg' },
    reviewers: [{
        email: { type: String },
        password: { type: String }
    }],
    paperSubmissionPrice: { type: Number, default: 0 },
    bookingPrice: { type: Number, default: 0 }
});

const ConferenceModel = mongoose.model("Conference", ConferenceSchema);

class MongooseConferenceRepository implements ConferenceRepository {
    async create(conference: Conference): Promise<Conference> {
        const createConference = await ConferenceModel.create(conference)
        return createConference.toObject();

    }
    update(conference: Conference): Promise<Conference> {
        throw new Error("Method not implemented.");
    }
    delete(conference: Conference): Promise<Conference> {
        throw new Error("Method not implemented.");
    }



    async getById(id: Types.ObjectId): Promise<Conference | null> {

        const conference = await ConferenceModel.findById(id).populate('users').exec();
        return conference ? conference.toObject() : null;
    }



    async getAll(): Promise<Conference[]> {

        const conferences = await ConferenceModel.find({}).sort({"startDate":1})


        return conferences.map(conference => conference.toObject());
    }

    async getByOrganizerId(organizations: Types.ObjectId): Promise<Conference[]> {
        const conferences = await ConferenceModel.find({ organizations: organizations }).exec();
        return conferences.map(conference => conference.toObject());
    }
    async registerConfUser(userId: ObjectId, confId: Types.ObjectId): Promise<void > {
        const conference = await ConferenceModel.findByIdAndUpdate(confId,{$push: { users: userId }})
        return  conference!.toObject();
    }

    async addReviewer(email: string,confId: Types.ObjectId,password: string): Promise<void> {
        const addReviewer = await ConferenceModel.findByIdAndUpdate(confId,{$push:{reviewers:{email:email,password:password}}})
    }
   async reviewerLogin(rEmail: string,confId:Types.ObjectId, rPassword: string): Promise<void> {
    const conference = await ConferenceModel.findOne({
        _id: confId,
        "reviewers.email": rEmail,
        "reviewers.password": rPassword,
    });
   
   }

   async getByUserId(userId:ObjectId):Promise<Conference[]>{
    const conferences = await ConferenceModel.find({ users: userId }).exec();
    return conferences.map(conference => conference.toObject());
   }
}

export default MongooseConferenceRepository
