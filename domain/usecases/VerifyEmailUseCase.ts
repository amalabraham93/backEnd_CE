import UserRepository from '../../domain/repositories/userRepository';

class VerifyEmailUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string): Promise<void> {
    await this.userRepository.markEmailAsVerified(userId);
  }
}

export default VerifyEmailUseCase;