const router = require("express").Router();
const {} = require("../controllers/bookingController");

router.get("/", getServices);
router.get("/:serviceId", getSingleService);
router.post("/add", createService);
router.patch("/:serviceId", updateService);
router.delete("/:serviceId", deleteService);

module.exports = router;