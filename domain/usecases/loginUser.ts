import User from '../../domain/entities/user';
import UserRepository from '../../domain/repositories/userRepository';
import bcrypt from "bcryptjs"

class LoginUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<User | null> {
    // Validate inputs
    // ...

    // Retrieve the user from the database by email and password
    const user = await this.userRepository.getUserByEmail(email);
    
    const passcheck= await bcrypt.compare(password,user!.password)
    
    
    if (user && passcheck) {
        return user;
      }
    return null;
  }
 
}

export default LoginUseCase;