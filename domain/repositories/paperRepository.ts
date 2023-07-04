import Paper from "domain/entities/paper";
import { ObjectId, Types } from "mongoose";

interface PaperRepository {
    create(paper:Paper): Promise<Paper>;
    update(paper:Paper): Promise<Paper>
    delete(paper:Paper): Promise<Paper>;
    getById(id:Types.ObjectId): Promise<Paper | null>;
    getAll():Promise<Paper[]>;
    getByConferenceId(conferenceId:Types.ObjectId):Promise<Paper[]>;
    getByUserId(userEmail:string):Promise<Paper[]>;
    updateAccepted(id: Types.ObjectId, approved: boolean): Promise<Paper | null>;
}
export default PaperRepository