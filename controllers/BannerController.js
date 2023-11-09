import BannerModel from "../models/BannerModel.js";
import path from "path";
import fs from "fs";

/**
 * create banner (login required)
 * @param {*} req
 * @param {*} res
 */
export const createBanner = async (req, res) => {
  const imageBanner = req.files.image;
  let newBanner;

  try {
    const dateSaveFile = new Date()
      .toISOString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const nameBanner =
      imageBanner.md5 + dateSaveFile + path.extname(imageBanner.name);

    newBanner = `//${req.get("host")}/images/banner/${nameBanner}`;
    const urlBanner = req.body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newData = new BannerModel({
      title: req.body.title,
      image: newBanner,
      imageName: nameBanner,
      url: urlBanner,
      ref: {
        user: req.name,
        id: req.userId,
      },
      createdAt: new Date().toISOString(),
    });

    try {
      const checkBanner = await BannerModel.findOne({ url: urlBanner });

      if (checkBanner)
        return res
          .status(500)
          .json({ status: "error", message: "event already exist" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error });
    }

    try {
      await newData.save();

      imageBanner.mv(`./public/images/banner/${nameBanner}`, async (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });

      res.status(201).json({
        status: "created",
        data: { newData },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: error.message, step: 2 });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns edit banners
 */
export const updateBanner = async (req, res) => {
  const { id: _id } = req.params;
  const imageBanner = req.files?.image;
  const folderPath = "../backend/public/images/banner/";
  let newBanner;
  let nameBanner;

  try {
    // get data banner
    const data = await BannerModel.findOne({ _id });
    // check if banner exist
    if (!data)
      return res
        .status(401)
        .json({ status: "error", message: "product not found" });

    // check if new image exist
    if (imageBanner) {
      const dateSaveFile = new Date()
        .toISOString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      nameBanner =
        imageBanner.md5 + dateSaveFile + path.extname(imageBanner.name);

      newBanner = `//${req.get("host")}/images/banner/${nameBanner}`;

      // delete old image
      try {
        await fs.promises.unlink(`${folderPath}${data.imageName}`);
        console.log(`${data.image}`);
      } catch (error) {
        throw error;
      }
    } else {
      // set image old form database
      newBanner = data.image;
      console.log(newBanner);
    }

    const urlBanner = req.body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newData = {
      title: req.body.title,
      image: newBanner,
      imageName: nameBanner,
      url: urlBanner,
      ref: {
        user: req.name,
        id: req.userId,
      },
      modifiedAt: new Date().toISOString(),
    };

    try {
      await BannerModel.findByIdAndUpdate(_id, { ...newData, id: _id }),
        { new: true };

      imageBanner.mv(`./public/images/banner/${nameBanner}`, async (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });

      res.status(201).json({
        status: "created",
        data: { newData },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: error.message, step: 2 });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns delete banners
 */
export const deleteBanner = async (req, res) => {
  const { id: _id } = req.params;
  const folderPath = "../backend/public/images/banner/";

  try {
    const data = await BannerModel.findOne({ _id });

    if (!data)
      return res
        .status(500)
        .json({ status: "error", message: "banner not found" });

    // get name image from database
    const bannerImage = data.imageName;

    // proccess delete image
    try {
      await fs.promises.unlink(`${folderPath}${bannerImage}`);
      console.log(`File img banner deleted ${bannerImage}`);
    } catch (error) {
      throw error;
    }

    // delete item from database
    if (req.role === "admin") {
      await BannerModel.findByIdAndRemove(_id);
    } else {
      if (req.userId.toString() !== data.published.userId.toString())
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorize" });

      await BannerModel.findByIdAndRemove(_id);
    }
    // send to end point
    res.status(200).json({ status: "deleted", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
