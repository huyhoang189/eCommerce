const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`Ecommerce start with port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit server express!"));
});
