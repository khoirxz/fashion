import mongoose from "mongoose";
import AddressModel from "../models/AddressModel.js";

export const getAddress = async (req, res) => {
  try {
    const response = await AddressModel.find({ userId: req.customerId });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getOneAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await AddressModel.findOne({ _id: id });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({
        status: "error",
        message: "Mohon logout dan login kembali!",
      });

    if (data.userId.toString() !== req.customerId.toString())
      return res.status(500).json({
        error: "error",
        message: "harap login kembali",
      });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const createAddess = async (req, res) => {
  const { address1, address2, postal, distric, city, province } = req.body;

  const newData = new AddressModel({
    userId: req.customerId,
    address1,
    address2,
    postal,
    distric,
    city,
    province,
    createdAt: new Date().toISOString(),
  });
  try {
    await newData.save();

    res.status(201).json({
      status: "created",
      data: { newData },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  const { address1, address2, postal, distric, city, province } = req.body;
  const { id } = req.params;

  const data = await AddressModel.findOne({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      status: "error",
      message: "Mohon logout dan login kembali!",
    });

  if (data.userId.toString() !== req.customerId.toString())
    return res.status(500).json({
      error: "error",
      message: "harap login kembali",
    });

  try {
    const newData = {
      address1,
      address2,
      postal,
      distric,
      city,
      province,
      modifiedAt: new Date().toISOString(),
    };

    const updatedData = await AddressModel.findByIdAndUpdate(
      id,
      { ...newData },
      { new: true }
    );

    res.status(201).json(updatedData);
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;

  const data = await AddressModel.findOne({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      status: "error",
      message: "Mohon logout dan login kembali!",
    });

  if (data.userId.toString() !== req.customerId.toString())
    return res.status(500).json({
      error: "error",
      message: "harap login kembali",
    });

  try {
    await AddressModel.findByIdAndRemove(id);

    res.status(201).json({
      error: "success",
      message: "address deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: error.message,
    });
  }
};
