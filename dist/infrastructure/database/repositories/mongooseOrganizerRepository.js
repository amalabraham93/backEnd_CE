"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrganizerSchema = new mongoose_1.default.Schema({
    organizername: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const OrganizerModel = mongoose_1.default.model("organization", OrganizerSchema);
class MongooseOrganizerRepository {
    async createOrganizer(organizer) {
        const createdOrganizer = await OrganizerModel.create(organizer);
        return createdOrganizer.toObject();
    }
    async getOrganizerById(id) {
        const foundOrganizer = await OrganizerModel.findById(id).exec();
        return foundOrganizer ? foundOrganizer.toObject() : null;
    }
    async getOrganizerByEmail(email) {
        const foundOrganizer = await OrganizerModel.findOne({ email }).exec();
        return foundOrganizer ? foundOrganizer.toObject() : null;
    }
    // async updateOrganizer(organizer: Organizer): Promise<Organizer> {
    //   const updatedOrganizer = await OrganizerModel.findByIdAndUpdate(
    //     organizer.id,
    //     organizer,
    //     { new: true }
    //   ).exec();
    //   return updatedOrganizer ? updatedOrganizer.toObject() : null;
    // }
    async deleteOrganizer(id) {
        await OrganizerModel.findByIdAndDelete(id).exec();
    }
}
exports.default = MongooseOrganizerRepository;
