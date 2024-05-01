/**
 * Build a version controlled key-value store with a HTTP API we can query that from. The API
needs to be able to:
 *  Requirement 1: Accept {key: '...', value: '...'} and store them. If key exist, update the value
 *  Requirement 2: Accept {key: '...'} and return it's corresponding value
 *  Requirement 3: If give {key: '...', timestamp: '...'}, return the value with with the same timestamp
 */

const express = require("express");
const mongoose = require("mongoose");
const Store = require("./models/store.model");
const app = express();

app.use(express.json());

/**
 * Requirement 1
 */
app.post("/api/store", async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://qilaqi:S5SKZhTO0BF3rK6P@backenddb.ldr8s5j.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection to database failed");
  });
