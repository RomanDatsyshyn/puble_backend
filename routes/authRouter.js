const router = require("express").Router();

const { authControllers } = require("../controllers");
const { authMiddlewares, userMiddlewares } = require("../middlewares");

router.post(
  "/",
  authMiddlewares.checkIsUserPresentMiddleware,
  authControllers.authUser
);
router.post(
  "/logout",
  userMiddlewares.checkAccessTokenMiddleware,
  authControllers.logoutUser
);

module.exports = router;
