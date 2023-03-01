import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";

export const fetchAllCategory = async (req, res) => {
  try {
    const response = await CategoryModel.find();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const fetchCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(401)
      .json({ status: "error", message: "something wrong!" });

  try {
    const response = await CategoryModel.findById(id);

    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { category } = req.body;

  const data = await CategoryModel.findOne({ category });

  if (data)
    return res.status(500).json({ status: "error", message: "Duplicate name" });

  const newData = new CategoryModel({
    title: category,
    createdAt: new Date().toISOString(),
    modifiedAt: null,
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

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const data = await CategoryModel.findOne({ title });
  if (data)
    return res.status(500).json({ status: "error", message: "Duplicate name" });

  if (title === "" || null || undefined)
    return res.status(400).json({
      status: "error",
      message: "Categori tidak boleh kosong!",
    });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      status: "error",
      message: "Category not found!",
    });

  const category = await CategoryModel.findById(id);
  if (!category)
    return res.status(409).json({
      status: "error",
      message: "Category not found!",
    });

  try {
    const updatedData = {
      title: title,
      modifiedAt: new Date().toISOString(),
    };

    const updateData = await CategoryModel.findByIdAndUpdate(
      id,
      {
        ...updatedData,
        id: id,
      },
      { new: true }
    );

    res.status(201).json(updateData);
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {};
