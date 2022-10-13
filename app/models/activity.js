import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    info : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Book",
        },
        title : {type:String},
    },
     category : {type: String},
     time : {
         id : {
             type : mongoose.Schema.Types.ObjectId,
             ref : "Issue",
         },
         returnDate : {type:Date},
         issueDate : {type:Date},
     },
     user_id : {
         id : {
             type : mongoose.Schema.Types.ObjectId,
             ref : "User",
         },
         username: { type:String },
     },
     fine : {
         amount: { type:Number },
         date : {type:Date},
     },
     entryTime : {type : Date,default : Date.now(),}
 });
 
 const activityModel =  mongoose.model("Activity", activitySchema);

export default activityModel;
