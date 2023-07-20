"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetConfByIdUseCase {
    conferenceRepository;
    constructor(conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }
    async execute(id) {
        const getConfById = this.conferenceRepository.getById(id);
        return getConfById;
    }
}
exports.default = GetConfByIdUseCase;
