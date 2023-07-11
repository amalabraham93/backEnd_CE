import mongoose, { ObjectId } from "mongoose";
import User from "../../../domain/entities/user";
import UserRepository from "../../../domain/repositories/userRepository";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["author", "attendee"],
    required: true,
  },
  verificationToken: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  transactions: [{
    paymentType: { type: String, enum: ["author", "attendee"], required: true },
    conferenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' },
    paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
  }],
});

const UserModel = mongoose.model<User>("user", UserSchema);



class MongooseUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return createdUser.toObject();
  }

  async createVerificationToken(userId: ObjectId, token: string): Promise<void> {
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

  async markEmailAsVerified(_id: ObjectId): Promise<void> {
    await UserModel.findByIdAndUpdate(_id, { isEmailVerified: true }).exec();
  }

  async getUserById(_id: ObjectId): Promise<User | null> {
    const foundUser = await UserModel.findById(_id).exec();
    return foundUser ? foundUser.toObject() : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const foundUser = await UserModel.findOne({ email }).exec();
    return foundUser ? foundUser.toObject() : null;
  }

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

  async deleteUser(id: ObjectId): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }

  async makePayment(userId: ObjectId, paymentType: string, conferenceId?: ObjectId | undefined, paperId?: ObjectId | undefined, amount?: number): Promise<void> {
    const transaction = {
      paymentType,
      conferenceId,
      paperId,
      amount,
    };
    await UserModel.findByIdAndUpdate(userId, { $push: { transactions: transaction } }).exec();
  }
}

export default MongooseUserRepository;


    // async updateUser(user: User): Promise<User | null> {
    //   const updatedUser = await UserModel.findByIdAndUpdate(user.id, user.toObject(), {
    //     new: true,
    //   }).exec();
    //   return updatedUser ? updatedUser.toObject() : null;
    // }