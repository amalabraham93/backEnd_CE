"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("../../entities/admin"));
class CreateAdminUseCase {
    adminRepository;
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async execute(name, email, password, role) {
        // Validate inputs
        // ...
        // Create a new admin entity
        const newAdmin = new admin_1.default(name, email, password, role);
        // Save the admin to the database
        const createdAdmin = await this.adminRepository.createAdmin(newAdmin);
        return createdAdmin;
    }
}
exports.default = CreateAdminUseCase;
