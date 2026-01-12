const router = require("express").Router();
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

router.post("/", createCategory);
router.get("/", getCategories);

module.exports = router;
