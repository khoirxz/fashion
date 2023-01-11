import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const UserModel = mongoose.model("userSchema", userSchema);

export default UserModel;
