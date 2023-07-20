"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetPaperByIdUseCase {
    paperRepository;
    constructor(paperRepository) {
        this.paperRepository = paperRepository;
    }
    async execute(id) {
        const paper = await this.paperRepository.getById(id);
        return paper;
    }
}
exports.default = GetPaperByIdUseCase;
