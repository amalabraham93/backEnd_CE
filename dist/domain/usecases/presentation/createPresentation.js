"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const presentation_1 = __importDefault(require("../../entities/presentation"));
class CreatePresentationUseCase {
    presentationRepository;
    emailService;
    conferenceRepository;
    userRepository;
    constructor(presentationRepository, emailService, conferenceRepository) {
        this.presentationRepository = presentationRepository;
        this.emailService = emailService;
        this.conferenceRepository = conferenceRepository;
    }
    async execute(stream_key, conference) {
        // Create a new presentation entity
        const newPresentation = new presentation_1.default(stream_key, conference);
        // Save the presentation to the database
        const createdPresentation = await this.presentationRepository.createPresentation(newPresentation);
        const conferences = await this.conferenceRepository.getById(conference);
        const user = conferences.users;
        if (!conference) {
            throw new Error('Conference not found');
        }
        const userEmails = conferences.users.map(user => user.email);
        const link = `http://localhost:4200/conference/${conference}/presentation`;
        await this.emailService.conferenceStartNotification(userEmails, link);
        return createdPresentation;
    }
}
exports.default = CreatePresentationUseCase;
