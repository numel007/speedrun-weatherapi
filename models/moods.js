const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  condition: { type: String, required: true },
  mood: { type: String, required: false },
});

module.exports = mongoose.model("Mood", MoodSchema);
