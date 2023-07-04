import Paper from "../../../domain/entities/paper";
import PaperRepository from "domain/repositories/paperRepository";
import { Date, ObjectId, Types } from "mongoose";

class GetPaperByIdUseCase {
    private paperRepository: PaperRepository;

    constructor(paperRepository: PaperRepository) {
        this.paperRepository = paperRepository;
    }

    async execute(id:Types.ObjectId): Promise<Paper|null> {
        
        const paper = await this.paperRepository.getById(id);
      
        return paper;
    }
}

export default GetPaperByIdUseCase;
