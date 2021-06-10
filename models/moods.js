const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  condition: { type: String, required: true },
  mood: { type: String, required: true },
});

module.exports = mongoose.model("Mood", MoodSchema);
