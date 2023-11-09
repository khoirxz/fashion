import UserModel from "../models/UserModel.js";
import CustomerModel from "../models/CustomerModel.js";

export const validateUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ status: "error", message: "please log in again" });
  }

  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });

  req.userId = user._id;
  req.name = user.name;
  req.role = user.role;
  next();
};

export const validateCustomer = async (req, res, next) => {
  if (!req.session.customerId) {
    return res
      .status(401)
      .json({ status: "error", message: "please log in again" });
  }

  const user = await CustomerModel.findOne({ _id: req.session.customerId });
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });

  req.customerId = user._id;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.session.userId });
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });
  if (user.role !== "admin")
    return res.status(401).json({
      status: "error",
      message: "Unauthortize",
    });
  next();
};
