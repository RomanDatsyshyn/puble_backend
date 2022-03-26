const events = require("events");

const { Offer, User } = require("../../database/models");

const emitter = new events.EventEmitter();

module.exports = async (req, res) => {
  try {
    const offer = new Offer({
      serviceSeller: req.user,
    });

    const savedOffer = await offer.save();

    const { userId } = req.body;

    const user = await User.findById(userId);
    user.feed = user.feed.concat(savedOffer._id);
    await user.save();
    // emitter.emit(`userFeed`, user.feed);
    //
    emitter.emit(`userFeed-${user._id}`, user.feed);
    //
    res.status(200).end();
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "sendMessageToUsers",
      errors: e.message,
    });
  }
};
