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
  communityCoverage:{
    type: String,
    enum: ["Public","Private"]
  }

});
const community = mongoose.model("communities", communitySchema);

module.exports = { community };

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
