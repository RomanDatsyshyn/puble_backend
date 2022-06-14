const router = require("express").Router();

const { serviceControllers } = require("../controllers");
const { authMiddlewares } = require("../middlewares");

router.post("/addProposition", serviceControllers.createServiceProposition);

router.use(authMiddlewares.checkAdminToken);

router.post("/", serviceControllers.addService);
router.put("/changeName", serviceControllers.changeName);
router.delete("/delete", serviceControllers.deleteService);

module.exports = router;
