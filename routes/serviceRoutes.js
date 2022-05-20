const router = require("express").Router();
const {
  getServices,
  getSingleService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);
router.get("/:serviceId", getSingleService);
router.post("/add", createService);
router.patch("/:serviceId", updateService);
router.delete("/:serviceId", deleteService);

module.exports = router;
