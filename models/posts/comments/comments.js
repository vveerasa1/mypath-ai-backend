const mongoose = require("mongoose");
const commentsSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  comment: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const Comments = mongoose.model("comments", commentsSchema);
module.exports = { Comments };
