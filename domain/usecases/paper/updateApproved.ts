import Paper from "../../../domain/entities/paper";
import PaperRepository from "../../../domain/repositories/paperRepository";
import { Date, Types } from "mongoose";

class UpdateAproovedUseCase {
    private paperRepository: PaperRepository;

    constructor(paperRepository: PaperRepository) {
        this.paperRepository = paperRepository;
    }

    async execute(id:Types.ObjectId, approved: boolean): Promise<Paper|null> {
    
        
        const confPaper = await this.paperRepository.updateAccepted(id,approved);
        return confPaper;
    }
}

export default UpdateAproovedUseCase;
