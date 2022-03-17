const router = require("express").Router();

const { userControllers } = require("../controllers");
const { authMiddlewares, userMiddlewares } = require("../middlewares");

router.get(
  "/",
  userMiddlewares.checkAccessTokenMiddleware,
  userMiddlewares.getUserFromToken,
  userControllers.getUser
);

router.post("/send-code", userControllers.sendRecoveryCode);

router.put(
  "/change-password",
  userMiddlewares.checkIsPasswordNotEmptyMiddleware,
  userControllers.changePassword
);

router.delete(
  "/delete",
  userMiddlewares.checkAccessTokenMiddleware,
  userMiddlewares.getUserFromToken,
  userControllers.deleteUser
);

router.use(userMiddlewares.uploadUserPhotoMiddleware.single("usersPhoto"));

router.post(
  "/",
  authMiddlewares.checkIsUserDataNotEmptyMiddleware,
  authMiddlewares.checkIsPhoneUniqueMiddleware,
  userControllers.createUser
);

module.exports = router;
