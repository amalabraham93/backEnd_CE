"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conference_1 = __importDefault(require("../../entities/conference"));
class CreateConferenceUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(name, startdate, organizations) {
        const newConference = new conference_1.default(name, startdate, organizations);
        const createConference = this.conferenceRepository.create(newConference);
        return createConference;
    }
}
exports.default = CreateConferenceUseCase;
