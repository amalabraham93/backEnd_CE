"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MakePaymentUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId, paymentType, conferenceId, paperId, amount) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRepository.makePayment(userId, paymentType, conferenceId, paperId, amount);
        // await this.userRepository.updateUser(user);
    }
}
exports.default = MakePaymentUseCase;
