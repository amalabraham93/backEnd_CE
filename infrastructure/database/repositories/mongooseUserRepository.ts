import mongoose from "mongoose";
import User from "../../../domain/entities/user";
import UserRepository from "../../../domain/repositories/userRepository";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["author", "attendee"],
    require: true,
  },
  verificationToken: { type: String },
  isEmailVerified: { type: Boolean, default: false },
});

const UserModel = mongoose.model("user", UserSchema);




class MongooseUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    console.log(user);
    const createdUser = await UserModel.create(user);
    return createdUser.toObject();
  }

  async createVerificationToken(userId: string, token: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, {
      verificationToken: token,
    }).exec();
  }

  async findUserByVerificationToken(token: string): Promise<User | null> {
    const foundUser = await UserModel.findOne({
      verificationToken: token,
    }).exec();
    return foundUser ? foundUser.toObject() : null;
  }

  async markEmailAsVerified(userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { isEmailVerified: true }).exec();
  }

  async getUserById(id: string): Promise<User | null> {
    const foundUser = await UserModel.findById(id).exec();
    return foundUser ? foundUser.toObject() : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const foundUser = await UserModel.findOne({ email }).exec();
    return foundUser ? foundUser.toObject() : null;
  }

  // async updateUser(user: User): Promise<User | null> {
  //   const updatedUser = await UserModel.findByIdAndUpdate(user.id, user.toObject(), {
  //     new: true,
  //   }).exec();
  //   return updatedUser ? updatedUser.toObject() : null;
  // }
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find({}).exec();
    return users.map((user) => user.toObject());
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    const foundUser = await UserModel.findOne({ email, password }).exec();
    return foundUser ? foundUser.toObject() : null;
  }

  async deleteUser(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }
}

export default MongooseUserRepository;
