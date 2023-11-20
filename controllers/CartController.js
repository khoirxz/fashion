import mongoose from "mongoose";
import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";

export const fetchAllItems = async (req, res) => {
  try {
    const data = await CartModel.find({
      customerId: req.customerId,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const addCart = async (req, res) => {
  const {
    item: { productId, qty },
  } = req.body;

  let newData;

  if (!mongoose.isValidObjectId(productId))
    return res.status(500).json({ status: "error", message: "id tidak valid" });
  // hanya menerima interger dan lebih besar dari 0
  if (qty <= 0 || !Number.isInteger(qty))
    return res.status(500).json({ status: "error", message: "lebih dari 0" });
  // console.log(req.body);
  const dataProduct = await ProductModel.findById(productId);
  if (!dataProduct)
    return res
      .status(500)
      .json({ status: "error", message: "product not found" });
  // mengambil data card berdasarkan id user
  const dataCart = await CartModel.findOne({ customerId: req.customerId });
  // jika data card tidak ada makan akan dibuat data cart baru
  if (!dataCart) {
    newData = new CartModel({
      customerId: req.customerId,
      item: [
        {
          productId: dataProduct._id,
          thumbnail: dataProduct.thumbnail[0].url,
          qty: qty,
          price: dataProduct.price,
        },
      ],
      createdAt: new Date().toISOString(),
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
  } else {
    // jika ada item card sudah ada / sama maka akan update qty
    const filterData = dataCart.item.find(
      (item) => item.productId.toString() === productId
    );
    if (filterData) {
      console.log("pertama");

      try {
        const dataUpdated = await CartModel.findByIdAndUpdate(
          dataCart._id,
          {
            $set: {
              "item.$[elem].qty": qty,
              modifiedAt: new Date().toISOString(), // Combine both $set operations into a single object
            },
          },
          {
            new: true,
            arrayFilters: [{ "elem.productId": productId }],
          }
        );

        res.status(201).json({
          status: "success",
          message: dataUpdated,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    } else {
      // jika item cart tidak ada makan ditambahkan item cart baru
      console.log("kedua");

      newData = {
        productId: dataProduct._id,
        thumbnail: dataProduct.thumbnail[0].url,
        qty: qty,
        price: dataProduct.price,
      };

      try {
        const dataUpdated = await CartModel.findByIdAndUpdate(
          dataCart._id,
          {
            $push: {
              item: newData,
            },
            $set: {
              modifiedAt: new Date().toISOString(),
            },
          },
          { new: true }
        );

        res.status(201).json({
          status: "success",
          message: dataUpdated,
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    }
  }
};

export const removeCartItem = async (req, res) => {
  const { productId } = req.body;

  const dataCart = await CartModel.findOne({ customerId: req.customerId });
  try {
    const dataUpdated = await CartModel.findByIdAndUpdate(
      dataCart._id,
      {
        $pull: {
          item: { productId: productId },
        },
        $set: {
          modifiedAt: new Date().toISOString(),
        },
      },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      message: dataUpdated,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await CartModel.findByIdAndRemove(id);

    res.status(201).json({
      error: "success",
      message: "item deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: error.message,
    });
  }
};
