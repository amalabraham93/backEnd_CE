"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetByIdUseCase {
    paperRepository;
    constructor(paperRepository) {
        this.paperRepository = paperRepository;
    }
    async execute(confId) {
        const confPaper = await this.paperRepository.getByConferenceId(confId);
        return confPaper;
    }
}
exports.default = GetByIdUseCase;
