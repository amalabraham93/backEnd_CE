import UserRepository from '../../repositories/userRepository';
import User from '../../entities/user';
import EmailService from '../../services/EmailService';
import bcrypt from "bcryptjs"

class CreateUserUseCase {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor(userRepository: UserRepository, emailService: EmailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;


  }

  async execute(name: string, email: string, password: string, role: string): Promise<User> {

    const newPass = await bcrypt.hash(password, 10)

    // Create a new user entity
    const newUser = new User( name, email, newPass, role, '');

    // Save the user to the database
    const createdUser = await this.userRepository.createUser(newUser);
  //  const userId = createdUser
  console.log(createdUser._id);
   
    
    
    function generateVerificationToken(): string {
      // Generate a random verification token
      const token = Math.random().toString(36).substr(2);
      return token;
    }

    const verificationTokeng = generateVerificationToken();
    await this.userRepository.createVerificationToken(createdUser._id, verificationTokeng);
    await this.emailService.sendVerificationEmail(createdUser.email, verificationTokeng);

    return createdUser;
  }
}

export default CreateUserUseCase;
