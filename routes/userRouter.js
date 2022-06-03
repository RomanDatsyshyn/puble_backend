const router = require("express").Router();

const { userControllers } = require("../controllers");
const { authMiddlewares, userMiddlewares } = require("../middlewares");

router.get(
  "/",
  userMiddlewares.checkAccessToken,
  userMiddlewares.getUserFromToken,
  userControllers.getUser
);

router.put(
  "/updatePassword",
  userMiddlewares.checkAccessToken,
  userControllers.updatePassword
);

router.get(
  "/history",
  userMiddlewares.checkAccessToken,
  userMiddlewares.getUserFromToken,
  userControllers.getUserHistory
);

router.post(
  "/updateHistory",
  userMiddlewares.checkAccessToken,
  userControllers.updateHistory
);

router.delete(
  "/deleteHistoryItem",
  userMiddlewares.checkAccessToken,
  userControllers.deleteHistoryItem
);

router.post(
  "/send-code",
  authMiddlewares.checkByEmailIsUserPresent,
  userControllers.sendRecoveryCode
);

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
