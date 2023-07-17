import Organizer from '../../entities/organizer';
import OrganizerRepository from '../../repositories/organizerRepository';
import bcrypt from "bcryptjs";

class LoginOrganizerUseCase {
  private organizerRepository: OrganizerRepository;

  constructor(organizerRepository: OrganizerRepository) {
    this.organizerRepository = organizerRepository;
  }

  async execute(email: string, password: string): Promise<Organizer | null> {

    const organizer = await this.organizerRepository.getOrganizerByEmail(email);

    if (organizer) {
   
      const passwordMatch = await bcrypt.compare(password, organizer.password);

      if (passwordMatch) {
        return organizer;
      }
    }

    return null;
  }
}

export default LoginOrganizerUseCase;
