const mongoose = require("mongoose");

const KeySchema = mongoose.Schema({
  key: { type: String, required: [true, "Please enter a key"] },
  value: { type: String, required: [true, "Please enter a value"] },
  timestamp: { type: Date, default: Date.now() },
});

const Key = mongoose.model("Key", KeySchema);

module.exports = Key;
