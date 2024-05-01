const express = require("express");
const router = express.Router();
const {
  createKey,
  getKey,
  getAllKeys,
} = require("../../controller/key.controller");

router.get("/keys", getAllKeys);
router.get("/key", getKey);

router.post("/key", createKey);

module.exports = router;
