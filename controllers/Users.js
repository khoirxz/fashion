import UserModel from "../models/UserModel.js";
import argon2 from "argon2";

export const fetchAllUser = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await UserModel.find(
        {},
        {
          password: 0,
        }
      );
    } else {
      response = await UserModel.find(
        {},
        {
          _id: 0,
          password: 0,
        }
      );
    }

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const fetchUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await UserModel.findById(_id, {
      _id: 0,
      password: 0,
    });

    if (user === null)
      return res.status(500).json({
        status: "error",
        message: "something wrong",
      });

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role, createdAt } = req.body;

  if (password !== confirmPassword)
    return res.status(500).json({
      status: "error",
      message: "password tidak sama!",
    });

  const hashPassword = await argon2.hash(password);

  const newData = new UserModel({
    name: name,
    email: email,
    password: hashPassword,
    role: role,
    createdAt: createdAt,
  });
  try {
    await newData.save();

    res.status(201).json({ status: "success", newData });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const { name, email, password, confirmPassword, role, modifiedAt } = req.body;
  let hashedPassword;

  const user = await UserModel.findById(_id);
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });

  if (_id !== user._id)
    return res.status(409).json({
      status: "error",
      message: "Unauthorize action",
    });

  if (password !== confirmPassword)
    return res.status(409).json({
      status: "error",
      message: "password doesn't macth",
    });

  if (password === undefined || password === "" || password === null) {
    hashedPassword = user.password;
    // console.log("password tidak ganti");
  } else {
    hashedPassword = await argon2.hash(password);
    // console.log("password ganti");
  }

  const updatedData = {
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
    modifiedAt: modifiedAt,
  };

  try {
    const updateData = await UserModel.findByIdAndUpdate(
      _id,
      {
        ...updatedData,
        id: _id,
      },
      {
        new: true,
      }
    );

    res.status(201).json(updateData);
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });

  if (id === user._id)
    return res.status(409).json({
      status: "error",
      message: "Unauthorize action",
    });

  try {
    await UserModel.findByIdAndRemove(id);
    res.status(201).json({
      status: "success",
      message: "post deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: "post not found",
    });
  }
};
