import { book } from '../models/index.js';


//========================================POST/books==========================================================//

const create = async function (req, res) {
  try {

    let bookCreated = await book.create(req.body)

    res.status(201).send({ status: 1009, message: "Your Book has been created successfully", data: bookCreated });

  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};

//========================================POST/returnBooks==========================================================//

let returnBooks = async function (req, res) {
  try {

    let bookReturned = await book.create(req.body)

    res.status(201).send({ status: 1009, message: "Your Book has been returned successfully", data: bookReturned });

  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};

//========================================POST/updateBook==========================================================//

const update = async function (req, res) {
  try {

  }
  catch (err) {
    console.log(err.message)
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};


//========================================POST/renewBooks==========================================================//

const renew = async function (req, res) {
  try {

    let bookRenewed = await book.create(req.body)

    res.status(201).send({ status: 1009, message: "Your Book has been renewed successfully", data: bookRenewed })

  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};

//========================================POST/getbooks==========================================================//

const get = async function (req, res) {
  try {

    let bookData = await book.find({ $and: [{ isDeleted: false }, { isRenewed: false }, { isReturned: true }] }).select({ _id: 0, title: 1, ISBN: 1, author: 1, description: 1, category: 1 })

    if (!bookData) {
      return res.status(422).send({ status: 1006, message: "No Books Found....." });
    }

    return res.status(200).send({ status: 1010, message: 'All Books', data: bookData })
  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};

//========================================POST/deleteBooks==========================================================//

const deleteBooks = async function (req, res) {
  try {

    let bookId = req.params.bookId
    
    let checkBook = await book.findOne({ $and: [{ _id: bookId }, { isDeleted: false }, { isRenewed: false }, { isReturned: true }] })

    if (!checkBook) {
      return res.status(422).send({ status: 1011, message: "Book Already Deleted or does not exits" })
    }

    let updateBook = await book.findOneAndUpdate({ _id: bookId }, { isDeleted: true, deletedAt: Date.now() }, { new: true })

    return res.status(200).send({ status: 1010, message: 'Your Book has been deleted Successfully', data: updateBook })
  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};


//========================================GET/Returnedbooks==========================================================//

const returnedBooks = async function (req, res) {
  try {

    let returnBookData = await book.find({ $and: [{ isReturned: true }] }).select({ _id: 0, title: 1, ISBN: 1, author: 1,category: 1 })

    if (!returnBookData) {
      return res.status(422).send({ status: 1006, message: "No Returned Books Found....." });
    }

    return res.status(200).send({ status: 1010, message: 'All Returned Books', data: returnBookData })
  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};

//========================================GET/Renewedbooks==========================================================//

const renewedBooks = async function (req, res) {
  try {

    let renewedBookData = await book.find({ $and: [{ isRenewed: true }] }).select({ _id: 0, title: 1, ISBN: 1, author: 1,category: 1 })

    if (!renewedBookData) {
      return res.status(422).send({ status: 1006, message: "No Renewed Books Found....." });
    }

    return res.status(200).send({ status: 1010, message: 'All Renewed Books', data: renewedBookData })
  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};


export { create, returnBooks, update, renew, get,deleteBooks ,returnedBooks, renewedBooks}