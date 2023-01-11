import ProductModel from "../models/ProductModel.js";

export const fetchAllProduct = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await ProductModel.find().sort({ createdAt: -1 });
    } else {
      response = await ProductModel.find({
        "published.userId": req.userId,
      }).sort({ createdAt: -1 });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
export const fetchProduct = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const data = await ProductModel.findOne({ _id });

    let response;
    if (req.role === "admin") {
      response = await ProductModel.findOne({
        _id: data._id,
      });
    } else {
      response = await ProductModel.findOne({
        "published.userId": req.userId,
        _id: data._id,
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: "invalid id" });
  }
};
export const createProduct = async (req, res) => {
  const { title, price, description, thumbnail, createdAt } = req.body;

  const newData = new ProductModel({
    thumbnail,
    createdAt,
    title,
    price,
    description,
    published: {
      userId: req.userId,
      name: req.name,
    },
  });
  try {
    await newData.save();

    res.status(201).json({
      status: "created",
      data: { title, price, description, userId: req.userId },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const data = await ProductModel.findOne({ _id });

    const { title, price, description, modifiedAt } = req.body;
    if (req.role === "admin") {
      await ProductModel.findByIdAndUpdate(
        _id,
        { title, price, description, id: _id, modifiedAt },
        { new: true }
      );
    } else {
      if (req.userId.toString() !== data.published.userId.toString())
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorize" });

      await ProductModel.findByIdAndUpdate(
        _id,
        { title, price, description, id: _id },
        { new: true }
      );
    }
    res.status(200).json({ status: "updated", message: "Product Updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const data = await ProductModel.findOne({ _id });

    if (req.role === "admin") {
      await ProductModel.findByIdAndRemove(_id);
    } else {
      if (req.userId.toString() !== data.published.userId.toString())
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorize" });

      await ProductModel.findByIdAndRemove(_id);
    }
    res.status(200).json({ status: "deleted", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
