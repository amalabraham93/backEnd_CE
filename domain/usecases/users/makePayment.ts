import { ObjectId } from 'mongoose';
import User from '../../entities/user';
import UserRepository from '../../repositories/userRepository';

class MakePaymentUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    userId: ObjectId,
    paymentType: string, conferenceId?: ObjectId, paperId?: ObjectId, amount?: number
  ): Promise<void> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.makePayment(userId,paymentType,conferenceId,paperId, amount);

    // await this.userRepository.updateUser(user);
  }
}

export default MakePaymentUseCase;