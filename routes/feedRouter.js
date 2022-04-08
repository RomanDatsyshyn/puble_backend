const router = require("express").Router();

const { serviceSellerMiddlewares } = require("../middlewares");

const { Offer, User, Order, ServiceSeller } = require("../database/models");

const events = require("events");
const emitter = new events.EventEmitter();

router.use(serviceSellerMiddlewares.checkAccessToken);
router.use(serviceSellerMiddlewares.getServiceSellerFromToken);

router.get("/user/getOffers", (req, res) => {
  try {
    emitter.once(`userFeed-${req.user}`, (message) => res.json(message));
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "getUserOrder",
      errors: e.message,
    });
  }
});

router.post("/user/sendOrder/:category_id", async (req, res) => {
  try {
    const order = new Order({
      user: req.user,
      date: Date.now(),
      isCompleted: false,
    });

    const savedOrder = await order.save();

    const { category_id } = req.params;

    let avaliableServiceSellers = [];

    const serviceSellers = await ServiceSeller.find({});

    serviceSellers.map((s) => {
      s.categories.map((c) => {
        if (c == category_id) avaliableServiceSellers.push(s);
      });
    });

    avaliableServiceSellers.map(async (s) => {
      const serviceSeller = await ServiceSeller.findById(s._id);
      serviceSeller.feed = serviceSeller.feed.concat(savedOrder._id);
      await serviceSeller.save();
      emitter.emit(
        `serviceSellerFeed-${serviceSeller._id}`,
        serviceSeller.feed.reverse()
      );
    });

    res.status(200);
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "sendMessageToServiceSeller",
      errors: e.message,
    });
  }
});

router.get("/serviceSeller/getOrders", (req, res) => {
  try {
    emitter.once(`serviceSellerFeed-${req.user}`, (message) =>
      res.json(message)
    );
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "getServiceSellerFeed",
      errors: e.message,
    });
  }
});

router.post("/serviceSeller/sendOffer", async (req, res) => {
  try {
    const offer = new Offer({
      serviceSeller: req.user,
    });

    const savedOffer = await offer.save();

    const { userId } = req.body;

    const user = await User.findById(userId);
    user.feed = user.feed.concat(savedOffer._id);
    await user.save();

    emitter.emit(`userFeed-${user._id}`, user.feed.reverse());

    res.status(200);
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "sendMessageToUsers",
      errors: e.message,
    });
  }
});

module.exports = router;
