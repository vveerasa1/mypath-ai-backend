const mongoose = require("mongoose");
const domain= require("../domain");
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
  visibility:{
    type: String,
    enum: ["Public","Private"],
    default: 'Private'
  }
},{ discriminatorKey:"communityType"});
const Community = mongoose.model("communities", communitySchema);

module.exports = { Community };
