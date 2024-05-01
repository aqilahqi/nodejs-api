/**
 * Build a version controlled key-value Key with a HTTP API we can query that from. The API
needs to be able to:
 *  Requirement 1   : Accept {key: '...', value: '...'} and Key them
 *  Requirement 1.1 : If key exist, update the value
 *  Requirement 2   : Accept {key: '...'} and return it's corresponding value
 *  Requirement 3   : If given {key: '...', timestamp: '...'}, return the value with with the same timestamp
 */
const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const routes = require("./routes/v1/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", routes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@backenddb.ldr8s5j.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("Connected to database!");
    // app.listen(3000, () => {
    //   console.log("Server is running on port 3000");
    // });
  })
  .catch(() => {
    console.log("Connection to database failed");
  });

module.exports.handler = serverless(app);
