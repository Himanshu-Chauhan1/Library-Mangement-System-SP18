import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, enum: ["Mr", "Mrs", "Miss"] },
    name: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minLen: 8,
      maxLen: 15,
    },
    joined: { type: Date, default: Date.now() },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      pincode: { type: String, trim: true },
    },
    isAdmin: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);


userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

export default User;
