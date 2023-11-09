import BannerModel from "../../models/BannerModel.js";

/**
 * fetch all or get all banner (public route)
 * @param {*} req
 * @param {*} res
 */
export const fetchAllBanner = async (req, res) => {
  try {
    const data = await BannerModel.find({}).sort({ createdAt: -1 });

    res.status(201).json(data);
  } catch (error) {
    res.status(501).json({
      status: "error",
      message: "something wrong!",
    });
  }
};
/**
 * fetch one banner (public route)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const fetchBanner = async (req, res) => {
  const { link } = req.params;

  if (!link)
    return res.status(401).json({
      status: "error",
      message: "Unauthorize",
    });

  // console.log(link);
  // return res.end();
  try {
    const banner = await BannerModel.findOne({ url: link });

    return res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
