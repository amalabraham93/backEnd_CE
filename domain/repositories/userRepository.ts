import User from '../../domain/entities/user';
import { ObjectId } from 'mongoose';

interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserById(_id: ObjectId): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  // updateUser(user: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(_id: ObjectId): Promise<void>;
  getUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null>;
  createVerificationToken(_id: ObjectId, token: string): Promise<void>;
  findUserByVerificationToken(token: string): Promise<User | null>;
  markEmailAsVerified(_id: ObjectId): Promise<void>;
  makePayment(_id: ObjectId, paymentType: string, conferenceId?:ObjectId | undefined, paperId?: ObjectId | undefined, amount?: number):Promise<void>;
}

export default UserRepository;