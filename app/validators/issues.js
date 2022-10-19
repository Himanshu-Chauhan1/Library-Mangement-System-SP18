import mongoose from "mongoose";
import { book } from '../models/index.js'


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
      return false;
    return true;
  };
  
  //////////////// -FOR EMPTY BODY- ///////////////////////
  const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
  };
  
  //////////////// -FOR OBJECTID VALIDATION- ///////////////////////
  const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
  }

  //////////////// -FOR ISBN- ///////////////////////
  const isValidBookISBN = (ISBN) => {
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN);
  }
  
  //////////////// -FOR RETURN DATE- ///////////////////////
  const isValidReturnDate = (ISBN) => {
    return /(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/.test(ISBN);
  }



//========================================Issuebooks==========================================================//

const issueThebooks = async function (req, res, next) {
    try {
  
      const data = req.body;
  
      const { title,author,ISBN,description,category,returnDate} = req.body
  
      if (!isValidRequestBody(data)) {
        return res.status(422).send({ status: 1002, message: "Body is required" })
      }
  
      if (!isValid(title)) {
        return res.status(422).send({ status: 1002, message: "Title is required" })
      }
  
      let isRegisteredTitle = await book.findOne({ title }).lean();
  
      if (!isRegisteredTitle) {
        return res.status(422).send({ status: 1008, message: "Book Title is not Registered...... " });
      }
  
      if (!isValid(ISBN)) {
        return res.status(422).send({ status: 1003, message: "ISBN is required..." })
      }
  
      let isRegisteredISBN = await book.findOne({ ISBN }).lean();
  
      if (!isRegisteredISBN) {
        return res.status(422).send({ status: 1008, message: "This is not a Registered ISBN No. ........" });
      }
  
      if (!isValidBookISBN(ISBN)) {
        return res.status(422).send({ status: 1003, message: "Please enter a valid 13 digit ISBN No." });
      }
 
      if (!isValid(author)) {
        return res.status(422).send({ status: 1002, message: "You need to provide the author of the book..." })
      }

      let isNotRegisteredAuthor = await book.findOne({ ISBN }).lean();
  
      if (!isNotRegisteredAuthor) {
        return res.status(422).send({ status: 1008, message: "This is not a Registered Author........" });
      }
      if (!isValid(description)) {
        return res.status(422).send({ status: 1002, message: "You need to provide the description of the book..." })
      }
  
      let isNotRegisteredDescription = await book.findOne({ description }).lean();
  
      if (!isNotRegisteredDescription) {
        return res.status(422).send({ status: 1003, message: "This is not a registered Description" });
      }
  
        
      if (!isValid(category)) {
        return res.status(422).send({ status: 1002, message: "Category is required..." })
      }

      let isNotRegisteredCategory = await book.findOne({ ISBN }).lean();
  
      if (!isNotRegisteredCategory) {
        return res.status(422).send({ status: 1008, message: "This is not a Registered Category........" });
      }
     
      if (!isValidReturnDate(returnDate)) {
        return res.status(422).send({ status: 1002, message: "You need to provide the return date of the book..." })
      }
       
    next()
    }
    catch (err) {
      console.log(err.message)
        return res.status(422).send({status: 1001, msg: "Something went wrong Please check back again" })
    }
};


export {issueThebooks}