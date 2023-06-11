import Admin from 'domain/entities/admin';

interface AdminRepository {
  createAdmin(admin: Admin): Promise<Admin>;
  getAdminById(id: string): Promise<Admin | null>;
  getAdminByEmail(email: string): Promise<Admin | null>;
  // updateAdmin(admin: Admin): Promise<Admin>;
  deleteAdmin(id: string): Promise<void>;
}

export default AdminRepository;
