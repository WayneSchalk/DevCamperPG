const { Sequelize, DataTypes, Model } = require("sequelize");
const slugify = require("slugify");
const db = require("../config/DB/dbConnect");
const Entity = require("./Entities");

const Events = db.define("event", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(64),
    unique: true,
  },

  slug: DataTypes.STRING,
  description: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  recurrence: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: { type: DataTypes.DATE },
  daysOfTheWeek: { type: DataTypes.ARRAY(DataTypes.STRING) },
  startTime: { type: DataTypes.STRING },
  endTime: { type: DataTypes.STRING },
  capacity: { type: DataTypes.INTEGER },
  bookingCloses: { type: DataTypes.STRING },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Events.belongsTo(Entity);

Events.addHook("beforeValidate", (event, options) => {
  event.slug = slugify(event.title, { lower: true });
});

module.exports = Events;
