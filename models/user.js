const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  backgroundMode: {
    type: String,
    enum: ["Light","Dark"],
    default: "Light",
  },
});
const user = mongoose.model("users", userSchema);
module.exports = { user };
