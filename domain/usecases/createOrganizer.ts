import OrganizerRepository from '../../domain/repositories/organizerRepository';
import Organizer from '../../domain/entities/organizer';

class CreateOrganizerUseCase {
  private organizerRepository: OrganizerRepository;

  constructor(organizerRepository: OrganizerRepository) {
    this.organizerRepository = organizerRepository;
  }

  async execute(name: string, email: string, organization: string): Promise<Organizer> {
    // Validate inputs
    // ...

    // Create a new organizer entity
    const newOrganizer = new Organizer('', name, email, organization);

    // Save the organizer to the database
    const createdOrganizer = await this.organizerRepository.createOrganizer(newOrganizer);

    return createdOrganizer;
  }
}

export default CreateOrganizerUseCase;
