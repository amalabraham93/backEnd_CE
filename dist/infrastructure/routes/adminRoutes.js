"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const mongooseAdminRepository_1 = __importDefault(require("../../infrastructure/database/repositories/mongooseAdminRepository"));
const createAdmin_1 = __importDefault(require("../../domain/usecases/admin/createAdmin"));
const adminRouter = express_1.default.Router();
const adminRepository = new mongooseAdminRepository_1.default();
const createAdmin = new createAdmin_1.default(adminRepository);
const adminController = new adminController_1.default(createAdmin);
// POST /admins
adminRouter.post('/', adminController.createAdminHandler);
// GET /admins/:id
// router.get('/:id', adminController.getAdminHandler);
// PUT /admins/:id
// router.put('/:id', adminController.updateAdminHandler);
// DELETE /admins/:id
// router.delete('/:id', adminController.deleteAdminHandler);
exports.default = adminRouter;
