import express from "express";
const userRouter = express.Router();
import { create, login } from "../controllers/users.js"
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'

userRouter.post('/register', create);
userRouter.post('/login', login);


export default userRouter