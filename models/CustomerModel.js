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
  locations: [
    {
      address1: String,
      address2: String,
      postal: Number,
      district: String,
      City: String,
      Provice: String,
    },
  ],
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const CustomerModel = mongoose.model("customerSchema", customerSchema);

export default CustomerModel;
