"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterConfUserUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(userId, confId) {
        const registeredConfUser = this.conferenceRepository.registerConfUser(userId, confId);
        return registeredConfUser;
    }
}
exports.default = RegisterConfUserUseCase;
