"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paper_1 = __importDefault(require("../../../domain/entities/paper"));
class CreatePaperUseCase {
    paperRepository;
    constructor(paperRepository) {
        this.paperRepository = paperRepository;
    }
    async execute(name, submissionTitle, users, author, affliation, conference, date, abstract) {
        const newPaper = new paper_1.default(name, submissionTitle, abstract, author, affliation, date, conference, users);
        const createdPaper = await this.paperRepository.create(newPaper);
        return createdPaper;
    }
}
exports.default = CreatePaperUseCase;
