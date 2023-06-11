import User from 'domain/entities/user';

interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  // updateUser(user: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
  // getUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

export default UserRepository;
