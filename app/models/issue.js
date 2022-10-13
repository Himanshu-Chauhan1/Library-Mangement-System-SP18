import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    book_info : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Book', 
        },
        title: { type: String },
        author: { type: String },
        ISBN: { type: String },
        category: { type: String },
        stock: { type: Number },
        issueDate : {type : Date, default : Date.now()},
        returnDate : {type : Date, default : Date.now() + 7*24*60*60*1000},
        isRenewed : {type : Boolean, default : false},
    }, 
    
    user_id : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        },
        
        username: { type: String }
    },
 });
 
 const issue = mongoose.model("Issue", issueSchema);

export default issue;
