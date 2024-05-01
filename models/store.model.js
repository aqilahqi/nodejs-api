const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema({
  key: { type: String, required: [true, "Please enter a key"] },
  value: { type: String, required: [true, "Please enter a value"] },
  timestamp: { type: Date, default: Date.now() },
});

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
