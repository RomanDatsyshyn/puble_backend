const router = require("express").Router();

const { categoryControllers } = require("../controllers");
const { authMiddlewares } = require("../middlewares");

router.get("/", categoryControllers.getAll);

router.post("/addProposition", categoryControllers.createCategoryProposition);

router.use(authMiddlewares.checkAdminToken);

router.post("/", categoryControllers.addCategory);
router.put("/changeName", categoryControllers.changeName);
router.put("/changeIcon", categoryControllers.changeIcon);
router.delete("/delete", categoryControllers.deleteCategory);

module.exports = router;
