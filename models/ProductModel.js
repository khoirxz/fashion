import mongoose, { Schema } from "mongoose";

const productSchema = Schema({
  title: String,
  price: Number,
  thumbnail: String,
  description: String,
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  published: {
    userId: Schema.Types.ObjectId,
    name: String,
  },
});

const ProductModel = mongoose.model("productSchema", productSchema);

export default ProductModel;
