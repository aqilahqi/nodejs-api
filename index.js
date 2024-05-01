/**
 * Build a version controlled key-value store with a HTTP API we can query that from. The API
needs to be able to:
 *  Requirement 1   : Accept {key: '...', value: '...'} and store them
 *  Requirement 1.1 : If key exist, update the value
 *  Requirement 2   : Accept {key: '...'} and return it's corresponding value
 *  Requirement 3   : If given {key: '...', timestamp: '...'}, return the value with with the same timestamp
 */

const express = require("express");
const mongoose = require("mongoose");
const Store = require("./models/store.model");
const app = express();

app.use(express.json());

/**
 * * Requirement 1
 */
app.post("/api/store", async (req, res) => {
  try {
    const list = await Store.find({});
    if (list.includes((item) => item.key === req.body.key)) {
      const store = await Store.create(req.body);
      res.status(200).json(store);
    } else {
      /** do update  */
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * * Requirement 2
 */
app.get("/api/store/find-key", async (req, res) => {
  try {
    const store = await Store.find({});
    const result = store.find((item) => item.key === req.body.key);
    res.status(200).json(result.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Requirement 3
 */
app.get("/api/store/find-key-timestamp", async (req, res) => {
  try {
    const store = await Store.find({});
    const getAllKeys = store.filter((item) => item.key === req.body.key);
    const result = getAllKeys.find(
      (item) =>
        new Date(item.timestamp).getTime() ===
        new Date(req.body.timestamp).getTime()
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get all stores
 */
app.get("/api/store", async (req, res) => {
  try {
    const store = await Store.find({});
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get store by id
 */
app.get("/api/store/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
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
