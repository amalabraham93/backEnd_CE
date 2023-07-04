import Paper from "../../../domain/entities/paper";
import PaperRepository from "domain/repositories/paperRepository";
import { Date, Types } from "mongoose";

class GetByUserIdUseCase {
    private paperRepository: PaperRepository;

    constructor(paperRepository: PaperRepository) {
        this.paperRepository = paperRepository;
    }

    async execute(userEmail:string): Promise<Paper[]> {
    
        
        const confPaper = await this.paperRepository.getByUserId(userEmail);
        return confPaper;
    }
}

export default GetByUserIdUseCase;
