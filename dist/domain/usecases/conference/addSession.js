"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddSessionUseCase {
    conferenceRepository;
    constructor({ conferenceRepository }) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(confId, sessionDate, session) {
        const conference = await this.conferenceRepository.getById(confId);
        if (!conference) {
            throw new Error("Conference not found");
        }
        await this.conferenceRepository.addSessionToSchedule(confId, sessionDate, session);
        // conference.addSessionToSchedule(sessionDate, session);
        // await this.conferenceRepository.update(
        //   confId,
        //   conference.getName(),
        //   conference.getStartDate(),
        //   conference.getEndDate()
        // );
    }
}
exports.default = AddSessionUseCase;
