const mongoose = require("mongoose");
const communitySchema = mongoose.Schema({
  domainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "domains",
    required: true,
  },
  communityName: {
    type: String,
    required: true,
    unique: true,
  },
  communityImage: {
    type: String,
    required: true,
  },
  communityType:{
    type: String,
    enum: ["Public","Private"]
  }
});
const community = mongoose.model("communities", communitySchema);

module.exports = { community };
