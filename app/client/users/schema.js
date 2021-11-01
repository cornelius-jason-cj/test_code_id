import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: Number,
  userName:  String,
  accountNumber: String,
  emailAddress:  String,
  identityNumber: String,
  password:  String,
  createdAt: { type: Date, default: Date.now },
});

export { userSchema };