"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateConferenceUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(id, name, startDate, endDate) {
        const updateConf = await this.conferenceRepository.update(id, name, startDate, endDate);
        return updateConf;
    }
}
exports.default = UpdateConferenceUseCase;
