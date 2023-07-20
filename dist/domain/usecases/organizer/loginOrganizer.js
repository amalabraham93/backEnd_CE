"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class LoginOrganizerUseCase {
    organizerRepository;
    constructor(organizerRepository) {
        this.organizerRepository = organizerRepository;
    }
    async execute(email, password) {
        const organizer = await this.organizerRepository.getOrganizerByEmail(email);
        if (organizer) {
            const passwordMatch = await bcryptjs_1.default.compare(password, organizer.password);
            if (passwordMatch) {
                return organizer;
            }
        }
        return null;
    }
}
exports.default = LoginOrganizerUseCase;
