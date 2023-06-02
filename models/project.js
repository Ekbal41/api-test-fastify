const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  desc: String,
  img: String,
  git: String,
  url: String,
});

module.exports = mongoose.model("Project", projectSchema);
