const router = require("express").Router();

const { userControllers, authControllers } = require("../controllers");
const { authMiddlewares, userMiddlewares } = require("../middlewares");

router.get(
  "/",
  userMiddlewares.checkAccessToken,
  userMiddlewares.getUserFromToken,
  userControllers.getUser
);

router.get("/checkToken", authControllers.verifyToken);
router.get(
  "/checkToken",
  authMiddlewares.checkIsUserPresent,
  authControllers.refreshToken
);

router.post("/send-code", userControllers.sendRecoveryCode);

router.put(
  "/change-password",
  userMiddlewares.checkIsPasswordNotEmpty,
  userControllers.changePassword
);

router.delete(
  "/delete",
  userMiddlewares.checkAccessToken,
  userMiddlewares.getUserFromToken,
  userControllers.deleteUser
);

router.put("/change-rating", userControllers.changeRating);

router.use(userMiddlewares.uploadUserPhoto.single("usersPhoto"));

router.post(
  "/",
  authMiddlewares.checkIsUserDataNotEmpty,
  authMiddlewares.checkIsPhoneUnique,
  userControllers.createUser
);

module.exports = router;
