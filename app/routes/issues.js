import express from "express";
const issueRouter = express.Router();
import { create,get } from '../controllers/issues.js';
import {issueThebooks} from '../validators/issues.js'
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'
import issue from "../models/issue.js";


issueRouter.post('/issue', [authentication,issueThebooks],create);
issueRouter.get('/issue', [authentication],get);



export default issueRouter