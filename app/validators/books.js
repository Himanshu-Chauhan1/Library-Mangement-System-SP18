import mongoose from "mongoose";
import { user,book } from '../models/index.js'


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

//////////////// -FOR DATE- ///////////////////////
const isValidDate = (ISBN) => {
    return /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(ISBN);
}


//////////////// -FOR RETURN DATE- ///////////////////////
const isValidReturnDate = (ISBN) => {
    return /(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/.test(ISBN);
}

//========================================CreateBooks==========================================================//

const createBook = async function (req, res, next) {
    try {

        const data = req.body;

        const { title, ISBN, stock, author, description, category } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Body is required" })
        }

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

        if (!isValidBookISBN(ISBN)) {
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

        next()

    }
    catch (err) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


//========================================ReturnBooks==========================================================//

let returnTheBooks = async function (req, res, next) {
    try {

        const data = req.body;

        const { title, ISBN, author, description, category, isReturned } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Body is required" })
        }

        if (!isValid(title)) {
            return res.status(422).send({ status: 1002, message: "Title is required" })
        }

        let isNotRegisteredTitle = await book.findOne({ title }).lean();

        if (!isNotRegisteredTitle) {
            return res.status(422).send({ status: 1003, message: "This is not a registered Title" });
        }

        if (!isValid(ISBN)) {
            return res.status(422).send({ status: 1002, message: "ISBN is required..." })
        }

        let isNotRegisteredISBN = await book.findOne({ ISBN }).lean();

        if (!isNotRegisteredISBN) {
            return res.status(422).send({ status: 1003, message: "This is not a registered ISBN No." });
        }

        if (!isValidBookISBN(ISBN)) {
            return res.status(422).send({ status: 1003, message: "Please enter a valid 13 digit ISBN No." });
        }

        if (!isValid(author)) {
            return res.status(422).send({ status: 1002, message: "You need to provide the author of the book..." })
        }

        let isNotRegisteredAuthor = await book.findOne({ author }).lean();

        if (!isNotRegisteredAuthor) {
            return res.status(422).send({ status: 1003, message: "This is not a registered Author" });
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
        let isNotRegisteredCategory = await book.findOne({ category }).lean();

        if (!isNotRegisteredCategory) {
            return res.status(422).send({ status: 1003, message: "This is not a registered Category" });
        }

        if (!isValid(isReturned)) {
            return res.status(422).send({ status: 1002, message: "isReturned is required..." })
        }

        if ((data.isReturned && data.isReturned != "true")) {
            return res.status(422).send({ status: 1003, message: "isRenewed must be True......" })
        }

        next()

    }
    catch (err) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


//========================================RenewBooks==========================================================//

const renewBooks = async function (req, res, next) {
    try {
  
      const data = req.body;
  
      const { title, ISBN, author, description, category, issueDate, newReturnDate, isRenewed } = req.body
  
      if (!isValidRequestBody(data)) {
        return res.status(422).send({ status: 1002, message: "Body is required" })
      }
  
      if (!isValid(title)) {
        return res.status(422).send({ status: 1002, message: "Title is required" })
      }
  
      let isNotRegisteredTitle = await book.findOne({ title }).lean();
  
      if (!isNotRegisteredTitle) {
        return res.status(422).send({ status: 1003, message: "This is not a registered Title" });
      }
  
      if (!isValid(ISBN)) {
        return res.status(422).send({ status: 1002, message: "ISBN is required..." })
      }
  
      let isNotRegisteredISBN = await book.findOne({ ISBN }).lean();
  
      if (!isNotRegisteredISBN) {
        return res.status(422).send({ status: 1003, message: "This is not a registered ISBN No." });
      }
  
      if (!isValidBookISBN(ISBN)) {
        return res.status(422).send({ status: 1003, message: "Please enter a valid 13 digit ISBN No." });
      }
  
      if (!isValid(author)) {
        return res.status(422).send({ status: 1002, message: "You need to provide the author of the book..." })
      }
  
      let isNotRegisteredAuthor = await book.findOne({ author }).lean();
  
      if (!isNotRegisteredAuthor) {
        return res.status(422).send({ status: 1003, message: "This is not a registered Author" });
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
      let isNotRegisteredCategory = await book.findOne({ category }).lean();
  
      if (!isNotRegisteredCategory) {
        return res.status(422).send({ status: 1003, message: "This is not a registered Category" });
      }
  
      if (!isValid(issueDate)) {
        return res.status(422).send({ status: 1002, message: "Issue Date is required..." })
      }
  
      if (!isValidDate(issueDate)) {
        return res.status(422).send({ status: 1003, message: "Please enter issue date in a correct format...." })
      }
  
      let isNotRegisteredIssuedate = await book.findOne({}).lean();
  
      if (!isNotRegisteredIssuedate) {
        return res.status(422).send({ status: 1003, message: "This is not a registered Issue Date" });
      }
  
      if (!isValid(newReturnDate)) {
        return res.status(422).send({ status: 1002, message: "New return Date is required..." })
      }
  
      if (!isValidReturnDate(newReturnDate)) {
        return res.status(422).send({ status: 1003, message: "Please enter new return date in a correct format...." })
      }
  
      if (!isValid(isRenewed)) {
        return res.status(422).send({ status: 1002, message: "isRenewed is required..." })
      }
  
      if ((data.isRenewed && data.isRenewed != "true")) {
        return res.status(422).send({ status: 1003, message: "isRenewed must be True......" })
      }
        
      next()
  
    }
    catch (err) {
      return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};
  
//========================================DeleteBooks==========================================================//

const deleteTheBooks = async function (req, res, next) {
    try {
  
      let bookId = req.params.bookId
  
      if (!bookId) {
        return res.status(422).send({ status: 1002, message: "Please enter Book-Id" })
      }
  
      if (!isValidObjectId(bookId)) {
        return res.status(422).send({ status: 1003, message: "Invalid BookId" })
      }
        
    next()
  
    }
    catch (err) {
      return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
  };
  
  

export { createBook, returnTheBooks, renewBooks, deleteTheBooks}

