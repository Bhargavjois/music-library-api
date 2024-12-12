import express from 'express';
import UserController from '../controllers/UserController.js';
import { authenticate, validateCredentials } from '../middlewares/AuthMiddleware.js';

const userRouter = express.Router();

userRouter.post('/signup', UserController.signup);
userRouter.post('/login', validateCredentials, UserController.login);
userRouter.get('/logout', authenticate, UserController.logout);
userRouter.put('/users/update-password', authenticate, UserController.updatePassword);

export { userRouter };