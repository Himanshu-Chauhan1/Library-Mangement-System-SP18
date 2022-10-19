import express from "express";
const bookRouter = express.Router();
import { create, returnBooks, renew, get, deleteBooks, update, returnedBooks, renewedBooks } from "../controllers/books.js"
import {createBook, returnTheBooks, renewBooks, deleteTheBooks} from '../validators/books.js'
import { authentication } from '../middleware/authentication.js'
import { authorization } from '../middleware/authorization.js'

bookRouter.post('/create', [authentication,createBook],create); 
bookRouter.post('/return', [authentication,returnTheBooks],returnBooks);
bookRouter.put('/update', [authentication],update);
bookRouter.post('/renew', [authentication,renewBooks],renew);
bookRouter.get('/get', [authentication],get);
bookRouter.delete('/delete/:bookId', [authentication,deleteTheBooks],deleteBooks);
bookRouter.get('/returnedBooks', [authentication],returnedBooks);
bookRouter.get('/renewedBooks', [authentication],renewedBooks);


export default bookRouter