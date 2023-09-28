import mongoose, { Schema } from "mongoose";

const customerSchema = Schema({
  username: String,
  firstName: String,
  lastName: String,
  profileImg: String,
  active: Boolean,
  email: String,
  password: String,
  telephone: String,
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const CustomerModel = mongoose.model("customerSchema", customerSchema);

export default CustomerModel;
