const router = require("express").Router();

const { serviceSellerControllers, userControllers } = require("../controllers");
const { authMiddlewares, serviceSellerMiddlewares } = require("../middlewares");

router.get(
  "/",
  serviceSellerMiddlewares.checkAccessTokenMiddleware,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.getServiceSeller
);

router.put(
  "/change-password",
  serviceSellerMiddlewares.checkIsPasswordNotEmptyMiddleware,
  serviceSellerControllers.changePassword
);

router.delete(
  "/delete",
  serviceSellerMiddlewares.checkAccessTokenMiddleware,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.deleteServiceSeller
);

router.post("/send-code", userControllers.sendRecoveryCode);

router.use(
  serviceSellerMiddlewares.uploadServiceSellerPhotoMiddleware.single(
    "serviceSellersPhoto"
  )
);

router.post(
  "/",
  authMiddlewares.checkIsServiceSellerDataNotEmptyMiddleware,
  authMiddlewares.checkIsServiceSellerPhoneUniqueMiddleware,
  serviceSellerControllers.createServiceSeller
);

module.exports = router;
