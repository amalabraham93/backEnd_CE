import mongoose, { ObjectId } from "mongoose";
import Admin from "domain/entities/admin";
import AdminRepository from "domain/repositories/adminRepository";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const AdminModel = mongoose.model("Admin", AdminSchema);

class MongooseAdminRepository implements AdminRepository {
  async createAdmin(admin: Admin): Promise<Admin> {
    const createdAdmin = await AdminModel.create(admin);
    return createdAdmin.toObject();
  }

  async getAdminById(id: ObjectId): Promise<Admin | null> {
    const foundAdmin = await AdminModel.findById(id).exec();
    return foundAdmin ? foundAdmin.toObject() : null;
  }

  async getAdminByEmail(email: string): Promise<Admin | null> {
    const foundAdmin = await AdminModel.findOne({ email }).exec();
    return foundAdmin ? foundAdmin.toObject() : null;
  }

  // async updateAdmin(admin: Admin): Promise<Admin> {
  //   const updatedAdmin = await AdminModel.findByIdAndUpdate(admin.id, admin, {
  //     new: true,
  //   }).exec();
  //   return updatedAdmin ? updatedAdmin.toObject() : null;
  // }

  async deleteAdmin(id: ObjectId): Promise<void> {
    await AdminModel.findByIdAndDelete(id).exec();
  }
}

export default MongooseAdminRepository;
