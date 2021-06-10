// Libs
require("dotenv").config();
require("./config/db-setup");
const express = require("express");
const app = express();

// Middleware
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Routes
