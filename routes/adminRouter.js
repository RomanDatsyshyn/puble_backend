const router = require("express").Router();

const { adminControllers } = require("../controllers");
const { authMiddlewares } = require("../middlewares");

router.use(authMiddlewares.checkAdminTokenMiddleware);
router.use(
  "/users/:user_id",
  authMiddlewares.checkIsUserPresentMiddlewareAdminPanel
);

router.put("/users/:user_id/block", adminControllers.blockUser);

router.put("/users/:user_id/unblock", adminControllers.unblockUser);

router.put(
  "/serviseSellers/:user_id/block",
  adminControllers.blockServiceSeller
);

router.put(
  "/serviseSellers/:user_id/unblock",
  adminControllers.unblockServiceSeller
);

module.exports = router;
