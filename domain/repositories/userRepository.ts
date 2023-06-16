import User from 'domain/entities/user';

interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  // updateUser(user: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
  // getUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
  createVerificationToken(userId: string, token: string): Promise<void>;
  findUserByVerificationToken(token: string): Promise<User | null>;
  markEmailAsVerified(userId: string): Promise<void>;
}

export default UserRepository;
