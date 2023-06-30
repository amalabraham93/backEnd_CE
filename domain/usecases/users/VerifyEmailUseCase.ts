import { ObjectId } from 'mongoose';
import UserRepository from '../../repositories/userRepository';

class VerifyEmailUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: ObjectId): Promise<void> {
    await this.userRepository.markEmailAsVerified(id);
  }
}

export default VerifyEmailUseCase;