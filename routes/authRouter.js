const router = require("express").Router();

const { authControllers } = require("../controllers");
const { authMiddlewares, userMiddlewares } = require("../middlewares");

router.post("/", authMiddlewares.checkIsUserPresent, authControllers.authUser);

router.post(
  "/logout",
  userMiddlewares.checkAccessToken,
  authControllers.logoutUser
);

router.post(
  "/serviceSeller",
  authMiddlewares.checkIsServiceSellerPresent,
  authControllers.authServiceSeller
);

router.post(
  "/serviceSeller/logout",
  authMiddlewares.checkServiceSellerToken,
  authControllers.logoutUser
);

router.post("/admin", authControllers.authAdmin);

router.post(
  "/admin/logout",
  authMiddlewares.checkAdminToken,
  authControllers.logoutUser
);

module.exports = router;
