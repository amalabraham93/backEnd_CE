"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetPresentationsByConferenceIdUseCase {
    presentationRepository;
    constructor(presentationRepository) {
        this.presentationRepository = presentationRepository;
    }
    async execute(conferenceId) {
        // Retrieve presentations by conference ID from the repository
        const presentations = await this.presentationRepository.getPresentationsByConferenceId(conferenceId);
        return presentations;
    }
}
exports.default = GetPresentationsByConferenceIdUseCase;
