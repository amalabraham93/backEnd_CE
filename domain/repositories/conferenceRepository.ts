import { ObjectId, Types } from "mongoose";
import Conference,{ScheduleDate,Session} from "../../domain/entities/conference";


interface ConferenceRepository {
    create(conference: Conference): Promise<Conference>;
    update(id: Types.ObjectId,name:string,startDate:Date,endDate:Date): Promise<Conference>;
    delete(conference: Conference): Promise<Conference>;
    getById(id: Types.ObjectId): Promise<Conference | null>;
    getAll(): Promise<Conference[]>;
    getByOrganizerId(organizations: Types.ObjectId): Promise<Conference[]>;
    registerConfUser(userId:ObjectId,confId:Types.ObjectId): Promise<void >;
    addReviewer(email:string,id:Types.ObjectId,password:string): Promise<void>;
    reviewerLogin(rEmail:string,confId:Types.ObjectId,rPassword:string):Promise<void>;
    getByUserId(userId:ObjectId): Promise<Conference[]>;
    addSessionToSchedule(
        confId: Types.ObjectId,
        sessionDate: Date,
        session: Session
      ): Promise<void>;
    // getConferenceSchedule(confId: Types.ObjectId): Promise<ScheduleDate[]>;
}
export default ConferenceRepository