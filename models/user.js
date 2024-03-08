const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  cognitoUserId:{
    type:String,
    required:true,
    unique:true
  },
  language: {
    type: String,
  },
  backgroundMode: {
    type: String,
    enum: ["Light","Dark"],
    default: "Light",
  },
});
const user = mongoose.model("users", userSchema);
module.exports = { user };
