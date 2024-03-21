const mongoose = require("mongoose");
const commentsSchema = mongoose.Schema({
 description:{
  type:String
 }
});
const Comments = mongoose.model("comments", commentsSchema);
module.exports = { Comments };
