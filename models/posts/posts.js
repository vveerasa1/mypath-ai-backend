const mongoose = require("mongoose");
const postsSchema = mongoose.Schema({
 description:{
  type:String
 },
 communityId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "communities"
 },
 userId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "users"
 },
 likes:{
   type: [mongoose.Schema.Types.ObjectId],
   ref: "users"
 },
 flag:{
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
