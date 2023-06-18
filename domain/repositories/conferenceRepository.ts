import { Types } from "mongoose";
import Conference from "../../domain/entities/conference";
import { ObjectId } from "mongodb";

interface ConferenceRepository {
    create(conference: Conference): Promise<Conference>;
    update(conference: Conference): Promise<Conference>;
    delete(conference: Conference): Promise<Conference>;
    getById(_id: Types.ObjectId): Promise<Conference | null>;
    getAll(): Promise<Conference[]>;
    getByOrganizerId(organizations: Types.ObjectId): Promise<Conference[]>;
}
export default ConferenceRepository