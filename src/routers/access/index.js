"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../core/async.handler");

const router = express.Router();

router.post("/shop/signup", asyncHandler(accessController.signUp));

//get all shop
router.get("/shop/getall", asyncHandler(accessController.getAll));
module.exports = router;
