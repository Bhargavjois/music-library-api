import express from 'express';
import AdminController from '../controllers/AdminController.js';
import { authenticate, authorize } from '../middlewares/AuthMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/', authenticate, authorize(['Admin']), AdminController.getAllUsers);
adminRouter.post('/add-user', authenticate, authorize(['Admin']), AdminController.addUser);
adminRouter.delete('/:id', authenticate, authorize(['Admin']), AdminController.deleteUser);

export { adminRouter };