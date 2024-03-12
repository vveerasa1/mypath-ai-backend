const mongoose = require("mongoose");
const resourcesSchema = mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: false
  },
  type:{
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false 
  }
}, { timestamps : true});
const Resource = mongoose.model("resources", resourcesSchema);

module.exports = { Resource };
