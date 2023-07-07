const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { checkOverload } = require("./helpers/checkConnect");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//init database
require("./dbs/init.mongodb");
// checkOverload();
//init router
app.use(require("./routers"));
//init error

module.exports = app;
