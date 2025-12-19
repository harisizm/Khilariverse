import express from 'express';
import { loginUser, registerUser, adminLogin, allUsers, deleteUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/all', allUsers);
userRouter.post('/delete', deleteUser);

export default userRouter;
