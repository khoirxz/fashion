import ProductModel from "../models/ProductModel.js";

export const validateProduct = async (req, res, next) => {
  const { title } = req.body;

  if (title === "")
    return res
      .status(401)
      .json({ status: "error", message: "Title is missing!" });

  const item = await ProductModel.findOne({ title });
  if (item)
    return res.status(409).json({
      status: "error",
      message: "Item sudah ada",
    });

  next();
};
