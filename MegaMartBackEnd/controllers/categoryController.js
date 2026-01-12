const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image)
      return res.status(400).json({ message: "Name & image required" });

    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
