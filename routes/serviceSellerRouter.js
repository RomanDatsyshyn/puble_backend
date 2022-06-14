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
  "/updatePassword",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerControllers.updatePassword
);

router.put(
  "/updatePhone",
  serviceSellerMiddlewares.checkAccessToken,
  authMiddlewares.checkIsPhoneUnique,
  serviceSellerControllers.updatePhone
);

router.put(
  "/updateTypeOfActivity",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerControllers.updateTypeOfActivity
);

router.put(
  "/updateMyContacts",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerControllers.updateMyContacts
);

router.put(
  "/addService/:id",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.addService
);

router.put(
  "/deleteService/:id",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.deleteService
);

router.delete(
  "/delete",
  serviceSellerMiddlewares.checkAccessToken,
  serviceSellerMiddlewares.getServiceSellerFromToken,
  serviceSellerControllers.deleteServiceSeller
);

router.post("/addPromo", serviceSellerControllers.createPromocode);

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
