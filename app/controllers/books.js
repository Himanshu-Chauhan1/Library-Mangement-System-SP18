import { user, book, issue, activity } from '../models/index.js';
import { isValid, isValidRequestBody,isValidObjectId } from '../validator/validator.js'



//========================================POST/books==========================================================//

const create = async function (req, res) {
    try {
  
      const data = req.body;
  
      const { title, ISBN, stock, author, description, category} = req.body
  
      const ISBN_ValidatorRegEx = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
  
      if (!isValidRequestBody(data)) {
        return res.status(422).send({ status: 1002, message: "Body is required" })
      }
      let sessionID = req.session;
      console.log(sessionID)
     let isRegisteredAdmin = await user.findOne({ isAdmin: true });
      
      if ((!isRegisteredAdmin)) {
        return res.status(422).send({ status: 1003, message: "You must be a admin to create a new book" })
      }
  
      if ((data.isDeleted && data.isDeleted != "false")) {
        return res.status(422).send({ status: 1003, message: "isDeleted must be false" })
      }
  
      if (!isValid(title)) {
        return res.status(422).send({ status: 1002, message: "Title is required" })
      }
  
      let isRegisteredTitle = await book.findOne({ title }).lean();
  
      if (isRegisteredTitle) {
        return res.status(422).send({ status: 1008, message: "Title already registered" });
      }
  
      if (!isValid(ISBN)) {
        return res.status(422).send({ status: 1003, message: "ISBN is required..." })
      }
  
      let isRegisteredISBN = await book.findOne({ ISBN }).lean();
  
      if (isRegisteredISBN) {
        return res.status(422).send({ status: 1008, message: "ISBN already registered" });
      }
  
      if (!ISBN_ValidatorRegEx.test(ISBN)) {
        return res.status(422).send({ status: 1003, message: "plz enter a valid 13 digit ISBN No." });
      }
  
      if (!isValid(stock)) {
        return res.status(422).send({ status: 1002, message: "You need to provide the availability of the book..." })
      }
      if (!isValid(author)) {
        return res.status(422).send({ status: 1002, message: "You need to provide the author of the book..." })
      }
      if (!isValid(description)) {
        return res.status(422).send({ status: 1002, message: "You need to provide the description of the book..." })
      }
      if (!isValid(category)) {
        return res.status(422).send({ status: 1002, message: "Category is required..." })
      }
    
      let bookCreated = await book.create(data)
  
      res.status(201).send({ status: 1009, message: "Your Book has been created successfully", data: bookCreated });
  
    }
    catch (err) {
        return res.status(422).send({status: 1001, msg: "Something went wrong Please check back again" })
    }
  };

export {create}