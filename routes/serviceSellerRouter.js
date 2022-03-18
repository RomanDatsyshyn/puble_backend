const router = require("express").Router();

const { serviceSellerControllers } = require("../controllers");
const { authMiddlewares, serviceSellerMiddlewares } = require("../middlewares");

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
