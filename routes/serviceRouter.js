const router = require("express").Router();

const { serviceControllers } = require("../controllers");
const { authMiddlewares } = require("../middlewares");

router.use(authMiddlewares.checkAdminToken);

router.post("/", serviceControllers.addService);
router.put("/changeName", serviceControllers.changeName);
router.put("/changeIcon", serviceControllers.changeIcon);
router.delete("/delete", serviceControllers.deleteService);

module.exports = router;
