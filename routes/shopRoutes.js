const router = require("express").Router();
const {
  deleteShop,
  updateShop,
  getSingleShop,
  getAllShops,
} = require("../controllers/shopController");

router.get("/", getAllShops);
router.get("/:shopId", getSingleShop);
router.patch("/:shopId", updateShop);
router.delete("/:shopId", deleteShop);

module.exports = router;
