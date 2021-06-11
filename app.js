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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  if (req.body.location) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.body.location}&appid=${process.env.WEATHER_API_KEY}`
      )
      .then((response) => {
        const weatherInfo = response["data"];
        let newMood = new Mood();
        newMood.condition = weatherInfo["weather"][0]["main"];
        newMood.save().then(res.render("weatherInfo", { weatherInfo }));
      })
      .catch((err) => {
        throw err;
      });
  }
});

app.post("/mood", (req, res) => {
  if (req.body.mood) {
    Mood.findOne()
      .sort({ _id: -1 })
      .limit(1)
      .then((selectedWeather) => {
        Mood.findByIdAndUpdate(selectedWeather._id, {
          mood: req.body.mood,
        }).then(res.json({ message: "Mood recorded." }));
      });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Weather api listening on port ${process.env.PORT}`);
});
