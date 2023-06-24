import OrganizerRepository from '../../repositories/organizerRepository';
import Organizer from '../../entities/organizer';
import bcrypt from "bcryptjs"

class CreateOrganizerUseCase {
  private organizerRepository: OrganizerRepository;

  constructor(organizerRepository: OrganizerRepository) {
    this.organizerRepository = organizerRepository;
  }

  async execute(organizername: string, email: string, password: string): Promise<Organizer> {
    // Validate inputs
    // ...
    const newPass = await bcrypt.hash(password, 10)
    // Create a new organizer entity
    const newOrganizer = new Organizer('', organizername, email, newPass);

    // Save the organizer to the database
    const createdOrganizer = await this.organizerRepository.createOrganizer(newOrganizer);

    return createdOrganizer;
  }
}

export default CreateOrganizerUseCase;
