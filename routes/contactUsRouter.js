const router = require("express").Router();

const { contactUsControllers } = require("../controllers");

router.post("/", contactUsControllers.contactUs);

module.exports = router;
