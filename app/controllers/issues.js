import { user, book, issue } from '../models/index.js';



//========================================POST/books==========================================================//

const create = async function (req, res) {
  try {
      
      let bookIssued = await issue.create(req.body)
  
      res.status(201).send({ status: 1009, message: "Your Book has been issued successfully", data: bookIssued });
  
    }
    catch (err) {
        return res.status(422).send({status: 1001, msg: "Something went wrong Please check back again" })
    }
};
  

//========================================GET/getIssuedbooks==========================================================//

const get = async function (req, res) {
  try {

    let issuedBookData = await issue.find({ $and: [{ isRenewed: false }] }).select({ _id: 0, title: 1, ISBN: 1, author: 1,category: 1 })

    if (!issuedBookData) {
      return res.status(422).send({ status: 1006, message: "No Books Found....." });
    }

    return res.status(200).send({ status: 1010, message: 'All Issued Books', data: issuedBookData })
  }
  catch (err) {
    return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
  }
};


export {create, get}