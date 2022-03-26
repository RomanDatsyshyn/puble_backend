const router = require("express").Router();

const { orderControllers, offerControllers } = require("../controllers");
const { serviceSellerMiddlewares } = require("../middlewares");

router.use(serviceSellerMiddlewares.checkAccessToken);
router.use(serviceSellerMiddlewares.getServiceSellerFromToken);

router.get("/user/getOffers", orderControllers.getUserFeed);

router.post(
  "/user/sendOrder/:category_id",
  orderControllers.sendMessageToServiceSellers
);

router.get("/serviceSeller/getOrders", offerControllers.getServiceSellerFeed);

router.post("/serviceSeller/sendOffer", offerControllers.sendMessageToUsers);

module.exports = router;
