const mongoose = require("mongoose");
const testimonialsSchema = mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  storyName:{
    type: String,
    required: true,
  },
  storyDescription:{
    type: String,
    required: true,
  },
  storyDate: {
    type: Date,
    required: true,
  },
  storyTime:{
    type: Date,
    required: true,
  }
});
const testimonials = mongoose.model("testimonials", testimonialsSchema);

module.exports = { testimonials };
