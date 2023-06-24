import Organizer from '../../entities/organizer';
import OrganizerRepository from '../../repositories/organizerRepository';
import bcrypt from "bcryptjs"

class LoginOrganizerUseCase {
  private organizerRepository: OrganizerRepository;

  constructor(OrganizerRepository: OrganizerRepository) {
    this.organizerRepository = OrganizerRepository;
  }

  async execute(email: string, password: string): Promise<Organizer | null> {
    // Validate inputs
    // ...

    // Retrieve the user from the database by email and password
    const organizer = await this.organizerRepository.getOrganizerByEmail(email);

    const passcheck= await bcrypt.compare(password,organizer!.password)

    
    if (organizer && passcheck) {
        return organizer;
      }
    return null;
  }
}

export default LoginOrganizerUseCase;