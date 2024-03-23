const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
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
  },
  image:{
    type:String,
  },
  communities:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "communities"
  },
  following:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users"
  }
});
const user = mongoose.model("users", userSchema);
module.exports = { user };
