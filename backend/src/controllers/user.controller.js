import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import { CustomError } from "../utils/custom.error.js";
import { mailSender } from "../middlewares/email.sender.js";

export class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.find();
            return res.status(200).send({
                success: true,
                data: users
            });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async addNewUser(req, res, next) {
        try {
            const {username, email, password } = req.body;

            let userExist = await UserModel.findOne({ email });
            if (userExist) {
                throw new CustomError(409, "User with this email already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new UserModel({ username, email, password: hashedPassword });
            const newUser = await user.save();
            return res.status(201).send({
                success: true,
                message: "User created successfully",
                data: newUser
            });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;
            const userIdObj = new mongoose.Types.ObjectId(userId);
            const userExist = await UserModel.findOne({ userId: userIdObj });
            if (!userExist) {
                throw new CustomError(404, "User not found");
            }
            const result = await UserModel.deleteOne({ userId: userIdObj });
            if (result.deletedCount) {
                return res.status(200).send({
                    success: true,
                    message: "User account deleted successfully"
                });
            } else {
                throw new CustomError(500, "Could not delete user account");
            }
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign(
                        { userId: user.userId, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    )
                    return res.status(200).send({
                        success: true,
                        data: user,
                        token: token
                    })
                } else {
                    throw new CustomError(400, "Wrong password! Try again")
                }
            } else {
                throw new CustomError(404, "User not found")
            }
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async resetPassword(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new CustomError(404, "User not found");
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
                return res.status(200).send({ success: true, message: "Password changed successfully" });
            }
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async mailRandomPassword(req, res) {
        try {
            const { email } = req.params;
            const userExist = await UserModel.findOne({ email });
            if (userExist) {
                let randomPassword = generator.generate({
                    length: 10,
                    uppercase: false
                });
                const hashedPassword = await bcrypt.hash(randomPassword, 10);
                await UserModel.updateOne({ email }, { $set: { password: hashedPassword } });
                const mailSent = await mailSender({ emailAddress: email, userName: userExist.userName });
                if(mailSent){
                    return res.status(200).send({
                        success:true,
                        message:"Temporary password sent on this email address. Login again"
                    })
                }
            } else {
                throw new CustomError(404, "No account found associated with this email");
            }
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

}

