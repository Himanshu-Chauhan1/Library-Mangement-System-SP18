import express from "express";
const bookRouter = express.Router();
import { create } from "../controllers/books.js"
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'

bookRouter.post('/create', authentication,create);


export default bookRouter