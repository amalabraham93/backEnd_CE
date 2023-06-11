import UserRepository from '../../domain/repositories/userRepository';
import User from '../../domain/entities/user';

class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(name: string, email: string, password: string): Promise<User> {
    // Validate inputs
    // ...

    // Create a new user entity
    const newUser = new User('', name, email, password);

    // Save the user to the database
    const createdUser = await this.userRepository.createUser(newUser);

    return createdUser;
  }
}

export default CreateUserUseCase;
