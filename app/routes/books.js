import express from "express";
const bookRouter = express.Router();
import { create } from "../controllers/books.js"
import { authentication, authorization } from '../middleware/auth.js'

bookRouter.post('/create', authentication,create);


export default bookRouter