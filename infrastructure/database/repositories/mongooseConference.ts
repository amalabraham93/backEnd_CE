import mongoose, { Types } from "mongoose";
import Conference from "domain/entities/conference";
import ConferenceRepository from "domain/repositories/conferenceRepository";
import { Schema } from "mongoose";
import { ObjectId } from "mongodb";


const ConferenceSchema = new mongoose.Schema({
    name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  organizations:  {type: Schema.Types.ObjectId, ref: 'Organization' },
  location: { type: String},
  type: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  banner:{type:String, default:'unsplash_6vajp0pscx0.jpeg'}
});

const ConferenceModel = mongoose.model("Conference", ConferenceSchema);

class MongooseConferenceRepository implements ConferenceRepository{
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
   async getById(id: ObjectId): Promise<Conference | null> {
        
    const conference= await ConferenceModel.findById({_id:id}).exec();
    return conference ? conference.toObject() : null;
    }
    getAll(): Promise<Conference[]> {
        throw new Error("Method not implemented.");
    }

    async getByOrganizerId(organizations: Types.ObjectId): Promise<Conference[]> {
        const conferences = await ConferenceModel.find({ organizations: organizations }).exec();
        return conferences.map(conference => conference.toObject());
      }

}

export default MongooseConferenceRepository
