"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../entities/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class CreateUserUseCase {
    userRepository;
    emailService;
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    async execute(name, email, password, role) {
        const newPass = await bcryptjs_1.default.hash(password, 10);
        // Create a new user entity
        const newUser = new user_1.default(name, email, newPass, role, '');
        // Save the user to the database
        const createdUser = await this.userRepository.createUser(newUser);
        function generateVerificationToken() {
            // Generate a random verification token
            const token = Math.random().toString(36).substr(2);
            return token;
        }
        const verificationTokeng = generateVerificationToken();
        await this.userRepository.createVerificationToken(createdUser._id, verificationTokeng);
        await this.emailService.sendVerificationEmail(createdUser.email, verificationTokeng);
        return createdUser;
    }
}
exports.default = CreateUserUseCase;
