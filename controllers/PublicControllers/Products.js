import ProductModel from "../../models/ProductModel.js";

// mengambil semua produk
export const getAllProducts = async (req, res) => {
  try {
    const response = await ProductModel.find({})
      .sort({
        createdAt: -1,
      })
      .select("title price slug thumbnail category");

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// mengambil satu produk
export const getOneProduct = async (req, res) => {
  const { slug, category } = req.params;

  console.log(category);
  try {
    const data = await ProductModel.findOne({ slug });

    if (!data)
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: "product not found" });
  }
};

// cari produk berdasarkan judul dan kategori
export const searchProduct = async (req, res) => {
  const { title: titleProduct } = req.params;
  const { category } = req.query;

  try {
    let data;

    // cek jika kategori ada
    if (category) {
      data = await ProductModel.find({
        title: { $regex: titleProduct, $options: "i" },
        "category.name": { $regex: category, $options: "i" },
      }).select("title price slug thumbnail category");
    } else {
      data = await ProductModel.find({
        title: { $regex: titleProduct, $options: "i" },
      }).select("title price slug thumbnail category");
    }

    if (!data)
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: "product not found" });
  }
};

// urutkan produk berdasarkan kategori
export const sortByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const data = await ProductModel.find({
      "category.name": { $regex: category, $options: "i" },
    }).select("title price slug thumbnail category");

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "error", message: "product not found" });
  }
};
