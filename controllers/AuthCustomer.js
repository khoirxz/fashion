import argon2d from "argon2";
import CustomerModel from "../models/CustomerModel.js";

export const LoginCustomer = async (req, res) => {
  const customer = await CustomerModel.findOne({ email: req.body.email });

  if (!customer)
    return res.status(409).json({
      status: "error",
      message: "email and password is wrong!",
    });

  const match = await argon2d.verify(customer.password, req.body.password);
  if (!match)
    return res.status(409).json({
      status: "error",
      message: "email and password is wrong!",
    });

  req.session.customerId = customer._id;
  res.status(200).json({
    id: customer._id,
    name: customer.name,
    email: customer.email,
  });
};
export const LogoutCustomer = async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(409).json({
        status: "error",
        message: "something wrong",
      });
    res.status(200).json({ status: "success", message: "log out" });
  });
};
export const VerifyCustomer = async (req, res) => {
  if (!req.session.customerId)
    return res
      .status(401)
      .json({ status: "error", message: "please log in again" });

  const customer = await CustomerModel.findOne(
    {
      _id: req.session.customerId,
    },
    { password: 0, firstName: 0, lastName: 0, telephone: 0 }
  );
  if (!customer)
    res.status(409).json({
      status: "error",
      message: "user not found",
    });

  res.status(201).json(customer);
};
