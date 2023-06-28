import Paper from "../../../domain/entities/paper";
import PaperRepository from "domain/repositories/paperRepository";
import { Date, Types } from "mongoose";

class CreatePaperUseCase {
    private paperRepository: PaperRepository;

    constructor(paperRepository: PaperRepository) {
        this.paperRepository = paperRepository;
    }

    async execute(
        name: string,
        submissionTitle:string,
        users: Types.ObjectId[],
        author: string[],
        affliation: string,
        conference: Types.ObjectId,
        date: Date,
        abstract: string
    ): Promise<Paper> {
        const newPaper = new Paper(name,submissionTitle, abstract, author, affliation, date, conference, users);
        const createdPaper = await this.paperRepository.create(newPaper);
        return createdPaper;
    }
}

export default CreatePaperUseCase;
