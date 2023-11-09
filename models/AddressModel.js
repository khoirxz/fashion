import mongoose, { Schema } from "mongoose";

const addressSchema = Schema({
  userId: Schema.Types.ObjectId,
  address1: String,
  address2: String,
  postal: Number,
  distric: String,
  city: String,
  province: String,
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const AddressModel = mongoose.model("AddressSchema", addressSchema);

export default AddressModel;
