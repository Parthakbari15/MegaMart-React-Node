const HeroSlide = require("../models/HeroSlide");

exports.createHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.create(req.body);

    res.status(201).json({
      success: true,
      data: slide,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find();

    res.json({
      success: true,
      data: slides,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
