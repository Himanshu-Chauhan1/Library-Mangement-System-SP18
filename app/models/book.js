import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    title: { type: String },
    ISBN: { type: String },
    stock: { type: Number },
    author: { type: String },
    description: { type: String },
    category: { type: String },
    isAdmin : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'user', 
  },
    isDeleted: { default: false },
  }, { timestamps: true }
);
const book = mongoose.model("book", booksSchema);

export default book;
