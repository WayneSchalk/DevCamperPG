const express = require("express");
const dotenv = require("dotenv");
//Local variables
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT}, Running in ${process.env.NODE_ENV}`
  );
});