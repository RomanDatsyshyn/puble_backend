const events = require("events");

const { Order, ServiceSeller } = require("../../database/models");

const emitter = new events.EventEmitter();

module.exports = async (req, res) => {
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
        if (c == category_id) {
          avaliableServiceSellers.push(s);
        }
      });
    });

    avaliableServiceSellers.map(async (s) => {
      const serviceSeller = await ServiceSeller.findById(s._id);
      serviceSeller.feed = serviceSeller.feed.concat(savedOrder._id);
      await serviceSeller.save();
      //
      emitter.emit(
        // `userFeed`,
        `serviceSellerFeed-${serviceSeller._id}`,
        serviceSeller.feed
      );
      //
    });

    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "sendMessageToServiceSeller",
      errors: e.message,
    });
  }
};
