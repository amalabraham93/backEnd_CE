import User from 'domain/entities/user';
import { ObjectId } from 'mongoose';

interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: any): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  // updateUser(user: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: any): Promise<void>;
  // getUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
  createVerificationToken(id: any, token: string): Promise<void>;
  findUserByVerificationToken(token: string): Promise<User | null>;
  markEmailAsVerified(id: any): Promise<void>;
}

export default UserRepository;
