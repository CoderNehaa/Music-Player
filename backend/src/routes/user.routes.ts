import express from "express";
import { authMiddleware } from "../middlewares/auth.validation.js";
import { validationMiddleware } from "../middlewares/form.validation.js";
import { UserController } from "../controllers/user.controller.js";

const userRouter = express.Router();
const userController = new UserController();


userRouter.get('/all', authMiddleware, userController.getAllUsers);
userRouter.post('/add', validationMiddleware, userController.addNewUser);
userRouter.post('/login', validationMiddleware, userController.signin);
userRouter.delete('/remove/:userId', authMiddleware, userController.deleteUser);
userRouter.patch('/resetPassword', authMiddleware, validationMiddleware, userController.resetPassword);
userRouter.post('/mailRandomPassword/:email', authMiddleware, userController.mailRandomPassword);


export default userRouter;

