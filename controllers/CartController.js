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

  // console.log(req.body);
  const dataProduct = await ProductModel.findById(productId);
  if (!dataProduct)
    return res
      .status(500)
      .json({ status: "error", message: "product not found" });

  const dataCart = await CartModel.findOne({ customerId: req.customerId });
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
    if (dataCart.item[0].productId !== productId)
      return res.status(500).json({
        status: "yes, buat kondisi baru",
      });

    const currentItem = dataCart.item.filter(
      (item) => item.productId.toString() === productId
    );
    newData = {
      item: [
        {
          productId: currentItem[0].productId,
          thumbnail: currentItem[0].thumbnail,
          price: currentItem[0].price,
          qty: qty,
        },
      ],
      modifiedAt: new Date().toISOString(),
    };
    console.log(newData);
    // console.log(productId);
    try {
      const dataUpdated = await CartModel.findByIdAndUpdate(
        dataCart._id,
        { ...newData, id: dataCart._id },
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
  // const resultFilter = dataCart.item.filter(item => item === productId)
};

// export const updateCart = async (req, res) => {
//   const {
//     item: { productId, qty },
//   } = req.body;
//   const { id } = req.params;

//   if (!mongoose.isValidObjectId(id))
//     return res.status(500).json({ status: "error", message: "id invalid" });

//   const dataProduct = await ProductModel.findById(productId);

//   if (!dataProduct)
//     return res
//       .status(500)
//       .json({ status: "error", message: "product not found" });

//   const dataCart = await CartModel.findById(id);
//   // console.log(dataCart);
//   if (!dataCart)
//     return res.status(500).json({ status: "error", message: "item not found" });
//   // const dataCart = await CartModel.findOne({ customerId: req.customerId });
//   // const resultFilter = dataCart.item.filter(item => item === productId)

//   const updatedCart = {
//     customerId: req.customerId,
//     item: [
//       {
//         qty: qty,
//       },
//     ],
//     createdAt: new Date().toISOString(),
//   };
//   try {
//     const dataUpdated = await CartModel.findByIdAndUpdate(
//       id,
//       { ...updatedCart, id: id },
//       { new: true }
//     );

//     console.log(dataUpdated);
//     res.status(201).json({
//       status: "success",
//       message: dataUpdated,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

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
