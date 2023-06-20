import CustomerModel from "../models/CustomerModel.js";
import libphonenumber from "libphonenumber-js";
import argon2 from "argon2";

export const fetchAllCustomer = async (req, res) => {
  try {
    const data = await CustomerModel.find({});

    res.status(200).json(data);
  } catch (error) {
    res.status(501).json({
      status: "error",
      message: "something wrong!",
    });
  }
};
export const fetchCustomer = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const customer = await CustomerModel.findById(_id);

    return res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const createCustomer = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    telephone,
  } = req.body;

  if (password !== confirmPassword)
    return res.status(500).json({
      status: "error",
      message: "password tidak sama!",
    });

  // hashed password
  const hashPassword = await argon2.hash(password);

  // validate username
  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username))
    return res.status(400).json({
      status: "error",
      message: "Username not valid!",
    });

  // validate email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email))
    return res.status(400).json({
      status: "error",
      message: "email not valid!",
    });

  const phonenumber = libphonenumber(telephone, "ID");
  if (phonenumber) {
    phonenumber.isValid() === true;
  } else {
    return res.status(400).json({ status: "error", message: "error" });
  }

  const newData = new CustomerModel({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
    telephone: phonenumber.number,
  });
  try {
    await newData.save();

    res.status(201).json({
      status: "success",
      message: newData,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const updateCustomer = async (req, res) => {
  const { id: _id } = req.params;
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    telephone,
  } = req.body;

  if (password !== confirmPassword)
    return res
      .status(501)
      .json({ status: "error", message: "password destn match" });

  const updateData = {
    username,
    firstName,
    lastName,
    email,
    password,
    telephone,
  };

  try {
    const data = await CustomerModel.findByIdAndUpdate(
      _id,
      {
        ...updateData,
        id: _id,
      },
      { new: true }
    );

    res.status(201).json({ status: "success", data: data });
  } catch (error) {
    res.status(500).json({ status: "success", error: error.message });
  }
};
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    await CustomerModel.findByIdAndRemove(id);
    res.status(201).json({
      status: "success",
      message: "deleted customer",
    });
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: "post not found",
    });
  }
};
