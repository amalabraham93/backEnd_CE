"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminController {
    createAdmin;
    constructor(createAdmin) {
        this.createAdmin = createAdmin;
    }
    async createAdminHandler(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const admin = await this.createAdmin.execute(name, email, password, role);
            res.status(201).json(admin);
        }
        catch (error) {
            console.error('Error creating admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.default = AdminController;
