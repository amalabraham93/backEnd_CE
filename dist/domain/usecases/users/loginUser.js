"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class LoginUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, password) {
        // Validate inputs
        // ...
        // Retrieve the user from the database by email and password
        const user = await this.userRepository.getUserByEmail(email);
        const passcheck = await bcryptjs_1.default.compare(password, user.password);
        if (user && passcheck) {
            return user;
        }
        return null;
    }
}
exports.default = LoginUseCase;
