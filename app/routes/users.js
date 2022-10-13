import express from "express";
const userRouter = express.Router();
import { create, login } from "../controllers/users.js"

userRouter.post('/register', create);
userRouter.post('/login', login);


export default userRouter