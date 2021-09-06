const db = require("../config/DB/dbConnect");
const Entity = require("../models/Entities");
// @desc Get all entities in the
// @route GET /api/v1/entities
// @access public

exports.getAllEntities = async (req, res) => {
  try {
    const entities = await Entity.findAll();
    res.status(200).json({ success: true, data: entities });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// @desc Get single entity
// @route GET /api/v1/entities/:id
// @access public

exports.getSingleEntity = async (req, res) => {
  try {
    const entity = await Entity.findAll({ where: { _id: req.params.id } });
    res.status(200).json({ success: true, data: entity });
  } catch (error) {
    res.status(404).json({ error: err.message });
  }
};

// @desc add single entity
// @route POST /api/v1/entities/
// @access private

exports.addEntity = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ error: error.fields });
  }
};

// @desc EDIT single entity
// @route PUT /api/v1/entities/:id
// @access private

exports.editEntity = async (req, res) => {
  try {
    let { title, description, website, email, phone, address } = req.body;
    const entity = await Entity.update(
      { title, description, website, email, phone, address },
      { where: { _id: req.params.id } }
    );
    res.status(201).json({ success: true, data: entity });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// @desc Delete single entity
// @route DELETE /api/v1/entities/:id
// @access private

exports.deleteEntity = async (req, res) => {
  try {
    let entity = await Entity.destroy({
      where: {
        _id: req.params.id,
      },
    });
    res.status(201).json({ message: "success", data: entity });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
