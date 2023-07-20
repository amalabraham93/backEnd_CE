"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
    transactions: [
        {
            paymentType: {
                type: String,
                enum: ["author", "attendee"],
                required: true,
            },
            conferenceId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Conference" },
            paperId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Paper" },
            date: { type: Date, default: Date.now },
            amount: { type: Number, required: true },
        },
    ],
});
const UserModel = mongoose_1.default.model("user", UserSchema);
class MongooseUserRepository {
    async createUser(user) {
        const createdUser = await UserModel.create(user);
        return createdUser.toObject();
    }
    async createVerificationToken(userId, token) {
        await UserModel.findByIdAndUpdate(userId, {
            verificationToken: token,
        }).exec();
    }
    async findUserByVerificationToken(token) {
        const foundUser = await UserModel.findOne({
            verificationToken: token,
        }).exec();
        return foundUser ? foundUser.toObject() : null;
    }
    async markEmailAsVerified(_id) {
        await UserModel.findByIdAndUpdate(_id, { isEmailVerified: true }).exec();
    }
    async getUserById(_id) {
        const foundUser = await UserModel.findById(_id).exec();
        return foundUser ? foundUser.toObject() : null;
    }
    async getUserByEmail(email) {
        const foundUser = await UserModel.findOne({ email }).exec();
        return foundUser ? foundUser.toObject() : null;
    }
    async getAllUsers() {
        const users = await UserModel.find({}).exec();
        return users.map((user) => user.toObject());
    }
    async getUserByEmailAndPassword(email, password) {
        const foundUser = await UserModel.findOne({ email, password }).exec();
        return foundUser ? foundUser.toObject() : null;
    }
    async deleteUser(id) {
        await UserModel.findByIdAndDelete(id).exec();
    }
    async makePayment(userId, paymentType, conferenceId, paperId, amount) {
        const transaction = {
            paymentType,
            conferenceId,
            paperId,
            amount,
        };
        await UserModel.findByIdAndUpdate(userId, {
            $push: { transactions: transaction },
        }).exec();
    }
}
exports.default = MongooseUserRepository;
// async updateUser(user: User): Promise<User | null> {
//   const updatedUser = await UserModel.findByIdAndUpdate(user.id, user.toObject(), {
//     new: true,
//   }).exec();
//   return updatedUser ? updatedUser.toObject() : null;
// }
