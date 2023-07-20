"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReviewerLoginUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(email, confId, password) {
        const addReviewer = this.conferenceRepository.reviewerLogin(email, confId, password);
    }
}
exports.default = ReviewerLoginUseCase;
