"use strict";

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/checkConnect");
const {
  db: { name, host, port },
} = require("../configs/config.mongodb");

const connectString = `mongodb://${host}:${port}/${name}`;

// console.log(connectString);
class Database {
  constructor() {
    this.connect();
  }

  //connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("connected mongodb");
        // countConnect();
      })
      .catch((err) => console.log(`Error connect ${err}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
