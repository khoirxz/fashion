import path from "path";
import ProductModel from "../models/ProductModel.js";

export const validateProduct = async (req, res, next) => {
  const { title } = req.body;

  if (title === "")
    return res
      .status(401)
      .json({ status: "error", message: "Title is missing!" });

  const item = await ProductModel.findOne({ title });
  if (req.method === "POST") {
    if (item)
      return res.status(409).json({
        status: "error",
        message: "Item sudah ada",
      });
  }

  next();
};

export const validateThumbnail = (req, res, next) => {
  if (req.files === null)
    return res.status(400).json({ status: "error", message: "image required" });

  const fileImage = req.files.image;
  // console.log(fileImage);
  if (Array.isArray(fileImage)) {
    // check img size
    for (const item of fileImage) {
      if (item.data.length > 5000000) {
        return res.status(400).json({
          status: "error",
          message: "Image size should not exceed 5MB.",
        });
      }
    }
    // check exstension img
    for (const item of fileImage) {
      if (![".png", ".jpg", ".jpeg"].includes(path.extname(item.name))) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid image format." });
      }
    }
  } else {
    if (fileImage.data.length > 5000000) {
      return res.status(400).json({
        status: "error",
        message: "Image size should not exceed 5MB.",
      });
    }
    if (![".png", ".jpg", ".jpeg"].includes(path.extname(fileImage.name))) {
      return res.status(400).json({
        status: "error",
        message: "Image size should not exceed 5MB.",
      });
    }
  }

  next();
};
