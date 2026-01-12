const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    subtitle: String,
    title: String,
    offer: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroSlide", heroSlideSchema);
