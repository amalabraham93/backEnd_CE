"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetByUserIdUseCase {
    paperRepository;
    constructor(paperRepository) {
        this.paperRepository = paperRepository;
    }
    async execute(userEmail) {
        const confPaper = await this.paperRepository.getByUserId(userEmail);
        return confPaper;
    }
}
exports.default = GetByUserIdUseCase;
