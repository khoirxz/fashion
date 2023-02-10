import mongoose, { Schema } from "mongoose";

const categorySchema = Schema({
  title: String,
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const CategoryModel = mongoose.model("categorySchema", categorySchema);

export default CategoryModel;
