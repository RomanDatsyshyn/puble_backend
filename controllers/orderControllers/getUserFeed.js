const events = require("events");

const emitter = new events.EventEmitter();

module.exports = async (req, res) => {
  try {
    //
    emitter.once(`userFeed-${req.user}`, (message) => {
      // emitter.once(`userFeed`, (message) => {
      console.log(message);
      res.json(message);
    });
    //
  } catch (e) {
    res.json({
      success: false,
      data: e.controller || "getUserOrder",
      errors: e.message,
    });
  }
};
