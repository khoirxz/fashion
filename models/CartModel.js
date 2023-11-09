import mongoose, { Schema } from "mongoose";

const cartSchema = Schema({
  customerId: Schema.Types.ObjectId,
  item: [
    {
      productId: Schema.Types.ObjectId,
      thumbnail: String,
      qty: Number,
      price: Number,
    },
  ],
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const CartSchema = mongoose.model("CartSchema", cartSchema);

export default CartSchema;
