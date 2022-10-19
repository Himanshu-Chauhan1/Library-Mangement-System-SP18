import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    title: { type: String,trim:true },
    ISBN: { type: String,trim:true },
    stock: { type: Number, trim:true},
    author: { type: String ,trim:true},
    description: { type: String, trim:true },
    category: { type: String, trim: true },
    deletedAt: { type: Date },
    isDeleted: {type:Boolean,default:false},
    isRenewed: {type:Boolean,default:false},
    isReturned: {type:Boolean,default:true},
  },
  { timestamps: true }
);
const book = mongoose.model("book", booksSchema);

export default book;
