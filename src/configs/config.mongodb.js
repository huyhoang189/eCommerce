"use strict";
require("dotenv").config();
const dev = {
  app: {
    port: process.env.DEV_PORT_APP || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "eCommerce",
  },
};

const config = { dev };
// console.log(dev);
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
