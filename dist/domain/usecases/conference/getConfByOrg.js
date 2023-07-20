"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllConfByOrgUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(organizations) {
        const getAllConfByOrg = this.conferenceRepository.getByOrganizerId(organizations);
        return getAllConfByOrg;
    }
}
exports.default = GetAllConfByOrgUseCase;
