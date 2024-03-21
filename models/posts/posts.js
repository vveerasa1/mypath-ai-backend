const mongoose = require("mongoose");
const { Comments } = require("./comments");
const postsSchema = mongoose.Schema({
 description:{
  type:String
 },
 comments:{
   type: [mongoose.Schema.Types.ObjectId],
   ref: "comments"
 },
 likes:{
   type: [mongoose.Schema.Types.ObjectId],
   ref: "users"
 },
 createdDate:{
    type:Date,
    required:true
 },
 image:{
    type:String
 }
});
const Posts = mongoose.model("posts", postsSchema);
module.exports = { Posts };
