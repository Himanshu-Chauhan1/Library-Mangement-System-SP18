import express from "express";
const issueRouter = express.Router();
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'


// router.post('/register', createUser);
// router.post('/login', loginUser);


export default issueRouter