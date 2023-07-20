"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organizer_1 = __importDefault(require("../../entities/organizer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class CreateOrganizerUseCase {
    organizerRepository;
    constructor(organizerRepository) {
        this.organizerRepository = organizerRepository;
    }
    async execute(organizername, email, password) {
        // Validate inputs
        // ...
        const newPass = await bcryptjs_1.default.hash(password, 10);
        // Create a new organizer entity
        const newOrganizer = new organizer_1.default(organizername, email, newPass);
        // Save the organizer to the database
        const createdOrganizer = await this.organizerRepository.createOrganizer(newOrganizer);
        return createdOrganizer;
    }
}
exports.default = CreateOrganizerUseCase;
