import { ObjectId, Types } from "mongoose";
import Conference from "../../domain/entities/conference";


interface ConferenceRepository {
    create(conference: Conference): Promise<Conference>;
    update(conference: Conference): Promise<Conference>;
    delete(conference: Conference): Promise<Conference>;
    getById(id: Types.ObjectId): Promise<Conference | null>;
    getAll(): Promise<Conference[]>;
    getByOrganizerId(organizations: Types.ObjectId): Promise<Conference[]>;
    registerConfUser(userId:ObjectId,confId:Types.ObjectId): Promise<void >;
    addReviewer(email:string,id:Types.ObjectId,password:string): Promise<void>;
    reviewerLogin(rEmail:string,confId:Types.ObjectId,rPassword:string):Promise<void>;
    getByUserId(userId:ObjectId): Promise<Conference[]>;
}
export default ConferenceRepository