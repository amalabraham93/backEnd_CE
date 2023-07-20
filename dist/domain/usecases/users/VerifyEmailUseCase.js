"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerifyEmailUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        await this.userRepository.markEmailAsVerified(id);
    }
}
exports.default = VerifyEmailUseCase;
