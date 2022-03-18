const router = require("express").Router();

const { userControllers } = require("../controllers");
const { authMiddlewares, userMiddlewares } = require("../middlewares");

router.get(
  "/",
  userMiddlewares.checkAccessToken,
  userMiddlewares.getUserFromToken,
  userControllers.getUser
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

router.use(userMiddlewares.uploadUserPhoto.single("usersPhoto"));

router.post(
  "/",
  authMiddlewares.checkIsUserDataNotEmpty,
  authMiddlewares.checkIsPhoneUnique,
  userControllers.createUser
);

module.exports = router;
