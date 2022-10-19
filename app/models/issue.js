import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
        title: { type: String },
        author: { type: String },
        ISBN: { type: String },
        category: { type: String },
        stock: { type: Number },
        issueDate : {type : Date, default : Date.now()},
        returnDate : {type : String},
        isRenewed : {type : Boolean, default : false},
 });
 
 const issue = mongoose.model("Issue", issueSchema);

export default issue;
