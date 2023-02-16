import mongoose, { Schema } from "mongoose";

const productSchema = Schema({
  title: String,
  price: Number,
  thumbnail: String,
  description: String,
  slug: String,
  category: {
    categoryId: Schema.Types.ObjectId,
    name: String,
  },
  option: {
    title: String,
    options: [],
  },
  specification: [
    {
      key: String,
      value: String,
    },
  ],
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  published: {
    userId: Schema.Types.ObjectId,
    name: String,
  },
});

const ProductModel = mongoose.model("productSchema", productSchema);

export default ProductModel;
