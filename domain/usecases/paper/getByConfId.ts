import Paper from "../../../domain/entities/paper";
import PaperRepository from "../../../domain/repositories/paperRepository";
import { Date, Types } from "mongoose";

class GetByIdUseCase {
    private paperRepository: PaperRepository;

    constructor(paperRepository: PaperRepository) {
        this.paperRepository = paperRepository;
    }

    async execute(confId:Types.ObjectId): Promise<Paper[]> {
        
        const confPaper = await this.paperRepository.getByConferenceId(confId);
        return confPaper;
    }
}

export default GetByIdUseCase;
