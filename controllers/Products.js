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
  const fileImage = req.files.image;
  let newThumbnail = [];
  // try-catch data
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

    // proccess save images to dir
    if (!Array.isArray(fileImage)) {
      // save img to directory (one)
      fileImage.mv(
        `./public/images/${
          fileImage.md5 +
          new Date()
            .toISOString()
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "") +
          path.extname(fileImage.name)
        }`,
        async (err) => {
          if (err)
            return res.status(500).json({ status: "error", message: err });
        }
      );
      newThumbnail = [
        {
          name:
            fileImage.md5 +
            new Date()
              .toISOString()
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "") +
            path.extname(fileImage.name),
          url: `//${req.get("host")}/images/${
            fileImage.md5 +
            new Date()
              .toISOString()
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "") +
            path.extname(fileImage.name)
          }`,
        },
      ];
    } else {
      // save img to directory (array)
      for (const item of fileImage) {
        item.mv(
          `./public/images/${
            item.md5 +
            new Date()
              .toISOString()
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "") +
            path.extname(item.name)
          }`,
          async (err) => {
            if (err)
              return res.status(500).json({ status: "error", message: err });
          }
        );
      }
      // format json for save to database
      newThumbnail = fileImage.map((item) => {
        return {
          name:
            item.md5 +
            new Date()
              .toISOString()
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "") +
            path.extname(item.name),
          url: `//${req.get("host")}/images/${
            item.md5 +
            new Date()
              .toISOString()
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "") +
            path.extname(item.name)
          }`,
        };
      });
    }
    // set all data product
    const newData = new ProductModel({
      title: req.body.title,
      price: req.body.price,
      thumbnail: newThumbnail,
      description: req.body.description,
      createdAt: new Date().toISOString(),
      category: {
        categoryId: resCategory._id,
        name: resCategory.title,
      },
      option: {
        title: req.body.titleOptions,
        options: !Array.isArray(req.body.values)
          ? [{ values: req.body.values }]
          : req.body.values.map((item) => {
              return {
                value: item,
              };
            }),
      },
      slug,
      specification: !Array.isArray(req.body.key)
        ? [{ key: req.body.key, value: req.body.svalue }]
        : req.body.key.map((itemkey, i) => {
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
      // save to database
      await newData.save();

      // response (successfully)
      res.status(201).json({
        status: "created",
        data: {
          title: req.body.title,
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: error.message, step: 2 });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message, step: 1 });
  }
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
