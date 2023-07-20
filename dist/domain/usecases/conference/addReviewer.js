"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddReviewerUseCase {
    conferenceRepository;
    emailService;
    constructor(conferenceRepository, emailService) {
        this.conferenceRepository = conferenceRepository;
        this.emailService = emailService;
    }
    async execute(email, confId, password) {
        const addReviewer = this.conferenceRepository.addReviewer(email, confId, password);
        const conferenceLink = `${process.env.ORIGIN}/organization/review-login/${confId}`;
        await this.emailService.sendReviewerEmail(email, password, conferenceLink);
    }
}
exports.default = AddReviewerUseCase;
