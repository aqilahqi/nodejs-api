const express = require("express");
const router = express.Router();
const {
  createKey,
  getKey,
  getAllKeys,
} = require("../../controller/key.controller");

router.get("/v1/keys", getAllKeys);
router.get("/v1/key", getKey);

router.post("/v1/key", createKey);

module.exports = router;
