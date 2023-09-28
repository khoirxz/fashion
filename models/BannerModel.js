import mongoose, { Schema } from "mongoose";

const bannerSchema = Schema({
  title: String,
  image: String,
  imageName: String,
  url: String,
  ref: {
    user: String,
    id: Schema.Types.ObjectId,
  },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
});

const BannerSchema = mongoose.model("BannerSchema", bannerSchema);

export default BannerSchema;
