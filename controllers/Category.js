import CategoryModel from "../models/CategoryModel.js";

export const fetchAllCategory = async (req, res) => {
  try {
    const response = await CategoryModel.find();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { category } = req.body;

  const data = await CategoryModel.findOne({ category });

  if (data)
    return res.status(500).json({ status: "error", message: "Duplicate name" });

  const newData = new CategoryModel({
    title: category,
    createAt: new Date().toISOString(),
  });
  try {
    await newData.save();

    res.status(201).json({
      status: "created",
      data: { category },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
