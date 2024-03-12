const mongoose = require("mongoose");
const testimonialsSchema = mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false 
  }
}, {timestamps: true});
const Testimonial = mongoose.model("testimonials", testimonialsSchema);

module.exports = { Testimonial };
