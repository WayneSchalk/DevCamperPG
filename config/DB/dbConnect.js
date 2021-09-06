const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "dev_camper",
  `${process.env.PGUSER}`,
  `${process.env.PGPW}`,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
const syncDB = async () => {
  try {
    await db.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.log(error);
  }
};

// syncDB();

module.exports = db;
