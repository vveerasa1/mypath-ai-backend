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
  },
  posts:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "posts"
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
