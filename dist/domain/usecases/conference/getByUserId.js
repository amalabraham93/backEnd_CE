"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetConfByUserUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(userId) {
        const getAllConfByOrg = this.conferenceRepository.getByUserId(userId);
        return getAllConfByOrg;
    }
}
exports.default = GetConfByUserUseCase;
