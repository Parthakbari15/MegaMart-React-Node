const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProductsByCategory,
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/category/:categoryId", getProductsByCategory);

module.exports = router;
