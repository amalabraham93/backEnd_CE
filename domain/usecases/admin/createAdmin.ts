import AdminRepository from '../../repositories/adminRepository';
import Admin from '../../entities/admin';

class CreateAdminUseCase {
  private adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(name: string, email: string, role: string): Promise<Admin> {
    // Validate inputs
    // ...

    // Create a new admin entity
    const newAdmin = new Admin('', name, email, role);

    // Save the admin to the database
    const createdAdmin = await this.adminRepository.createAdmin(newAdmin);

    return createdAdmin;
  }
}

export default CreateAdminUseCase;
