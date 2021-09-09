const { Sequelize, DataTypes, Model } = require("sequelize");
const slugify = require("slugify");
const db = require("../config/DB/dbConnect");
const { Events } = require("./Events");

const Entity = db.define("entity", {
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
  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.INTEGER,
    validate: {
      len: [10, 12],
    },
  },
  address: {
    type: DataTypes.STRING,
  },
  formattedAddress: {
    type: DataTypes.STRING,
  },
  registrationNumber: {
    type: DataTypes.INTEGER,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Create Slug from name
Entity.addHook("beforeValidate", (entity, options) => {
  entity.slug = slugify(entity.title, { lower: true });
});

module.exports = Entity;
