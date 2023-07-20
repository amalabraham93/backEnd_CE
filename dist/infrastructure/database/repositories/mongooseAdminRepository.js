"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const AdminModel = mongoose_1.default.model("Admin", AdminSchema);
class MongooseAdminRepository {
    async createAdmin(admin) {
        const createdAdmin = await AdminModel.create(admin);
        return createdAdmin.toObject();
    }
    async getAdminById(id) {
        const foundAdmin = await AdminModel.findById(id).exec();
        return foundAdmin ? foundAdmin.toObject() : null;
    }
    async getAdminByEmail(email) {
        const foundAdmin = await AdminModel.findOne({ email }).exec();
        return foundAdmin ? foundAdmin.toObject() : null;
    }
    // async updateAdmin(admin: Admin): Promise<Admin> {
    //   const updatedAdmin = await AdminModel.findByIdAndUpdate(admin.id, admin, {
    //     new: true,
    //   }).exec();
    //   return updatedAdmin ? updatedAdmin.toObject() : null;
    // }
    async deleteAdmin(id) {
        await AdminModel.findByIdAndDelete(id).exec();
    }
}
exports.default = MongooseAdminRepository;
