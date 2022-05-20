const router = require("express").Router();
const {
  loginShop,
  login,
  register,
  registerShop,
} = require("../controllers/authController");
const upload = require("../upload/upload");

router.post("/user/login", login);
router.post("/user/register", register);
router.post("/shop/register", upload.single("picture"), registerShop);
router.post("/shop/login", loginShop);

module.exports = router;
