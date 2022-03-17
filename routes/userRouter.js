const router = require("express").Router();

const { userControllers } = require("../controllers");
const { authMiddlewares, userMiddlewares } = require("../middlewares");

router.use(userMiddlewares.uploadUserPhotoMiddleware.single("usersPhoto"));

router.post(
  "/",
  authMiddlewares.checkIsUserDataNotEmptyMiddleware,
  authMiddlewares.checkIsPhoneUniqueMiddleware,
  userControllers.createUser
);

// router.use(userMiddlewares.checkAccessTokenMiddleware);
// router.use(userMiddlewares.getUserFromToken);

// router.get("/", userControllers.getUser);
// router.put(
//   "/edit",
//   userMiddlewares.checkIsPasswordNotEmptyMiddleware,
//   userControllers.changePassword
// );
// router.delete("/delete", userControllers.deleteUser);

module.exports = router;
