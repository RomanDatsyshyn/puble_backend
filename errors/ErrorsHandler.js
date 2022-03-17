module.exports = class ErrorsHandler extends Error {
  constructor(message, status = 500, controller = "Невідомий контроллер") {
    super(message);
    this.status = status;
    this.controller = controller;
    Error.captureStackTrace(this, this.constructor);
  }
};
