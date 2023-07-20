"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateAproovedUseCase {
    paperRepository;
    constructor(paperRepository) {
        this.paperRepository = paperRepository;
    }
    async execute(id, approved) {
        const confPaper = await this.paperRepository.updateAccepted(id, approved);
        return confPaper;
    }
}
exports.default = UpdateAproovedUseCase;
