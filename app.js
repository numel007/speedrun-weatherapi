// Libs
require("dotenv").config();
require("./config/db-setup");
const axios = require("axios");
const express = require("express");
const Mood = require("./models/moods");
const app = express();

// Middleware
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  if (req.query.location) {
    // console.log(req.query.location);
    // res.json({ message: req.query.location });
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.query.location}&appid=${process.env.WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
  } else {
    res.render("home");
  }
});

app.get("/mood", (req, res) => {});

app.listen(process.env.PORT, () => {
  console.log(`Weather api listening on port ${process.env.PORT}`);
});
