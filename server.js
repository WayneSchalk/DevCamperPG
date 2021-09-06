const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
//Local variables
dotenv.config({ path: "./config/config.env" });
const colors = require("colors");

const db = require("./config/DB/dbConnect");

const morgan = require("morgan");

const app = express();

app.use(express.json()); // for parsing application/json

//Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}

//Routes files
const entities = require("./routes/entities");

// Mount Routers

app.use("/api/v1/entities", entities);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const checkConnection = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.".blue.bold);
  } catch (error) {
    console.error("Unable to connect to the database:".red.bold, error);
  }
};

checkConnection();

const server = app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT}, Running in ${process.env.NODE_ENV}`
      .rainbow.bold
  );
});

// handle unhandled rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // close server && exit process
  server.close(() => process.exit(1));
});
