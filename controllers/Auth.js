import UserModel from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "email and password is wrong!",
    });

  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(409).json({
      status: "error",
      message: "password doestn match",
    });

  req.session.userId = user._id;
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(409).json({
        status: "error",
        message: "something wrong",
      });
    res.status(200).json({ status: "success", message: "log out" });
  });
};

export const Verify = async (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ status: "error", message: "please log in again" });
  }

  const user = await UserModel.findOne(
    { _id: req.session.userId },
    { password: 0 }
  );
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });

  res.status(201).json(user);
};
