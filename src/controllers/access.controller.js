"use strict";

const { OK, Created } = require("../core/sucess.response");
const AccessService = require("../services/access.service");

class AccessController {
  static signUp = async (req, res, next) => {
    return res.status(201).json(await AccessService.signUp(req.body));
  };
  static getAll = async (req, res, next) => {
    new Created({
      message: "Get all success",
      metadata: ["1", "2"],
    }).send(res);
  };
}

module.exports = AccessController;
