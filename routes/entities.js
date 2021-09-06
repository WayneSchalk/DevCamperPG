const express = require("express");
const {
  getAllEntities,
  getSingleEntity,
  addEntity,
  editEntity,
  deleteEntity,
} = require("../controllers/entities");
const router = express.Router();

router.route("/").get(getAllEntities).post(addEntity);

router.route("/:id").get(getSingleEntity).put(editEntity).delete(deleteEntity);

module.exports = router;
