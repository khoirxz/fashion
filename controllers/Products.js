import path from "path";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";

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
  if (req.files === null)
    return res.status(400).json({ status: "error", message: "image required" });
  const fileImage = req.files.image;
  const fileSize = fileImage.length;
  const ext = path.extname(fileImage.name);
  const fileName = fileImage.md5 + ext;
  const url = `://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res
      .status(422)
      .json({ status: "error", message: "type not allowed" });
  if (fileSize > 5000000)
    return res.status(422).json({ status: "error", message: "file to large" });

  fileImage.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ status: "error", message: err });

    try {
      // find category
      const resCategory = await CategoryModel.findOne({
        title: req.body.category,
      });
      if (!resCategory)
        return res
          .status(401)
          .json({ status: "error", message: "category not found" });

      // slugfy
      const slug = req.body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const newData = new ProductModel({
        title: req.body.title,
        price: req.body.price,
        thumbnail: url,
        description: req.body.description,
        createdAt: new Date().toISOString(),
        category: {
          categoryId: resCategory._id,
          name: resCategory.title,
        },
        option: {
          title: req.body.titleOptions,
          options: req.body.values.map((item) => {
            return {
              value: item,
            };
          }),
        },
        slug,
        specification: req.body.key.map((itemkey, i) => {
          return {
            key: itemkey,
            value: req.body.svalue[i],
          };
        }),
        published: {
          userId: req.userId,
          name: req.name,
        },
      });
      try {
        await newData.save();

        res.status(201).json({
          status: "created",
          data: {
            title: req.body.title,
          },
        });
      } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
  // res.json(data);
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const data = await ProductModel.findOne({ _id });

    const { title, price, description, modifiedAt, specification } = req.body;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (req.role === "admin") {
      await ProductModel.findByIdAndUpdate(
        _id,
        { title, price, description, slug, id: _id, modifiedAt, specification },
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
