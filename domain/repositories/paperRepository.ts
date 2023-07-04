import Paper from "domain/entities/paper";
import { Types } from "mongoose";

interface PaperRepository {
    create(paper:Paper): Promise<Paper>;
    update(paper:Paper): Promise<Paper>
    delete(paper:Paper): Promise<Paper>;
    getById(id:string): Promise<Paper | null>;
    getAll():Promise<Paper[]>;
    getByConferenceId(conferenceId:Types.ObjectId):Promise<Paper[]>;
    getByUserId(userEmail:string):Promise<Paper[]>;
}
export default PaperRepository