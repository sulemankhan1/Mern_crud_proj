const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// Includes
const config = require("./config");
const todoRoutes = require("./Routes/todoRoutes");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/todos", todoRoutes);

// DB Connection
mongoose.connect(config.dbURI, { useNewUrlParser: true }, err => {
  if (err) return console.log(err);

  console.log("Database Connected.");
});

// serve static files if we are in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../build"));
  app.get("*", (req, resp) => {
    resp.sendFile(path.resolve(__dirname + "/../build/index.html"));
  });
}
app.listen(config.PORT, err => {
  if (err) return console.log(err);

  console.log(`Server Started on PORT:${config.PORT}.`);
});
