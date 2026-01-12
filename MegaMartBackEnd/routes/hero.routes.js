const router = require("express").Router();
const {
  createHeroSlide,
  getHeroSlides,
} = require("../controllers/heroController");

router.post("/", createHeroSlide);
router.get("/", getHeroSlides);

module.exports = router;
