import Admin from 'domain/entities/admin';
import { ObjectId } from 'mongoose';

interface AdminRepository {
  createAdmin(admin: Admin): Promise<Admin>;
  getAdminById(id: ObjectId): Promise<Admin | null>;
  getAdminByEmail(email: string): Promise<Admin | null>;
  // updateAdmin(admin: Admin): Promise<Admin>;
  deleteAdmin(id: ObjectId): Promise<void>;
}

export default AdminRepository;
