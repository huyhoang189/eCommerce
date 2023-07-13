"use strict";

class SuccessResponse {
  constructor({
    message,
    statusCode = "200",
    resonStatusCode = "okkkk",
    metadata = {},
  }) {
    this.message = !message ? resonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({
    message,
    metadata,
    statusCode = "201",
    resonStatusCode = "create",
  }) {
    super({ message, metadata, statusCode, resonStatusCode });
  }
}

module.exports = {
  OK,
  Created,
};
