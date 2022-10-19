import express from "express";
import { update } from "../controllers/books.js";
const userRouter = express.Router();
import { create, login, updateUser, getAllUsers, deleteUser } from "../controllers/users.js"
import { createUser, userLogin, deleteTheUser } from '../validators/users.js'
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'

userRouter.post('/register', [createUser], create);
userRouter.post('/login', [userLogin], login);
userRouter.put('/update', updateUser);
userRouter.get('/get', getAllUsers);
userRouter.delete('/delete/:userid', [authentication,deleteTheUser], deleteUser);


export default userRouter