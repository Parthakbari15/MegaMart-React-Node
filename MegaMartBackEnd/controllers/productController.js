const Product = require("../models/Product");
const Category = require("../models/Category");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price, image and category are required",
      });
    }

    // 🔍 check category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      original: req.body.original,
      category,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name image");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    console.log(`cat id==>${req.params.categoryId}`);

    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId }).populate(
      "category",
      "name image"
    );

    res.json({
      success: true,
      count: products.length,
      category: products[0]?.category || null,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
