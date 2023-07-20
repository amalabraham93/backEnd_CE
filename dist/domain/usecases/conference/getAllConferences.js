"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllConfUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute() {
        const getAllConf = this.conferenceRepository.getAll();
        return getAllConf;
    }
}
exports.default = GetAllConfUseCase;
