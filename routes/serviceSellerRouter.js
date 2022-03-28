const router = require("express").Router();

const { serviceSellerControllers, userControllers } = require("../controllers");
const { authMiddlewares, serviceSellerMiddlewares } = require("../middlewares");

router.get(
  "/",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.getServiceSeller
);

router.put(
  "/change-password",
  serviceSellerMiddlewares.checkIsPasswordNotEmpty,
  serviceSellerControllers.changePassword
);

router.put(
  "/add-category/:id",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.addCategory
);

router.put(
  "/delete-category/:id",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.deleteCategory
);

router.delete(
  "/delete",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.deleteServiceSeller
);

router.post("/send-code", userControllers.sendRecoveryCode);

router.use(
  serviceSellerMiddlewares.uploadServiceSellerPhoto.single(
    "serviceSellersPhoto"
  )
);

router.post(
  "/",
  authMiddlewares.checkIsServiceSellerDataNotEmpty,
  authMiddlewares.checkIsServiceSellerPhoneUnique,
  serviceSellerControllers.createServiceSeller
);

module.exports = router;
