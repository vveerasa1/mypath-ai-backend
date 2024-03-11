const mongoose = require("mongoose");
const schoolSchema = mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: { type: String,
    required: true
  },
  country: { type: String,
    required: true
  },
  schoolType: {
    type: String,
    required: true,
  },
  educationalPaths: {
    type: String, //doubt
    required: true,
  },
  email:{
    type: String, //doubt
    required: true,
  },
  phoneNo:{
    type: String, //doubt
    required: true,
  },
  communityGuidelines:{
    type: String,
  },
  mentorshipPrograms:{
    type: String, //doubt
  },
  industryPartnerships:{
    type: String, //doubt
  },
  extraCurricularActivities:{
    type: String, //doubt
  },
  alumniNetwork:{
    type: String, //doubt
  },
  discussionForums:{
    type:Boolean,
    required:true
  },
  careeerResources:{
    type:String,
    required:true
  },
  enableFeedback:{
    type:Boolean,
    required:true
  },
  privacySetting:{
    type:String,
    required:true
  }
});
const schoolCommunity = mongoose.model("schoolCommunities", schoolSchema);

module.exports = { schoolCommunity };
