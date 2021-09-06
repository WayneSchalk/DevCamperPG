const db = require("../config/DB/dbConnect");
const Entity = require("../models/Entities");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc Get all entities in the
// @route GET /api/v1/entities
// @access public

exports.getAllEntities = asyncHandler(async (req, res) => {
  const entities = await Entity.findAll();
  if (!entities) {
    return next(new ErrorResponse(`No Entities not found`, 404));
  }
  res.status(200).json({ success: true, data: entities });
});

// @desc Get single entity
// @route GET /api/v1/entities/:id
// @access public

exports.getSingleEntity = asyncHandler(async (req, res, next) => {
  const entity = await Entity.findAll({ where: { _id: req.params.id } });

  if (!entity) {
    return next(
      new ErrorResponse(`Entity not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: entity });
});

// @desc add single entity
// @route POST /api/v1/entities/
// @access private

exports.addEntity = asyncHandler(async (req, res) => {
  const data = req.body;
  //insert into table
  let { title, description, website, email, phone, address } = data;
  let entity = await Entity.create({
    title,
    description,
    website,
    email,
    phone,
    address,
  });
  console.log(res.entity);
  res.status(201).json({ success: true, data: entity });
});

// @desc EDIT single entity
// @route PUT /api/v1/entities/:id
// @access private

exports.editEntity = asyncHandler(async (req, res) => {
  let { title, description, website, email, phone, address } = req.body;
  const entity = await Entity.update(
    { title, description, website, email, phone, address },
    { where: { _id: req.params.id } }
  );
  res.status(201).json({ success: true, data: entity });
});

// @desc Delete single entity
// @route DELETE /api/v1/entities/:id
// @access private

exports.deleteEntity = asyncHandler(async (req, res) => {
  let entity = await Entity.destroy({
    where: {
      _id: req.params.id,
    },
  });
  res.status(201).json({ message: "success", data: entity });
});
