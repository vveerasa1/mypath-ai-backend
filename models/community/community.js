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
  communityType:{
    type: String,
    enum: ["School","Buisness","Others"]
  },
  visibility:{
    type: String,
    enum: ["Public","Private"],
    default: 'Private'
  }

});
const Community = mongoose.model("communities", communitySchema);

module.exports = { Community };

// const mongoose = require("mongoose");
// const domain= require("../domain");
// const communitySchema = mongoose.Schema({
//   domainId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "domains",
//     required: true,
//   },
//   communityName: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   communityImage: {
//     type: String,
//     required: true,
//   },
//   communityType:{
//     type: String,
//     enum: ["Public","Private"]
//   }
// });
// const community = community.model("communities", communitySchema);

// module.exports = { community };
