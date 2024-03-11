const mongoose = require("mongoose");
const otherSchema = mongoose.Schema({
    communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  communityName:{
    type:String,
    required:true
  },
  topics:{
    type:String,
    required:true
  },
  rules:{
    type:String,
    required:true
  },
  moderatorInformation:{
    type:String,
    required:true
  },
  networkingOpportunities:{
    type:String,
    required:true
  },
  mentorProfiles:{
    type:Boolean,
    required:true
  },
  discussionForms:{
    type:Boolean,
    required:true
  },
  enableFeedback:{
    type:Boolean,
    required:true
  },
  searchFunctionality:{
    type:Boolean,
    required:true
  },
  membershipTiers:{
    type:String,
    required:true
  },
  privacy:{
    type:Boolean,
    required:true
  },

});
const otherCommunity = mongoose.model("otherCommunities", otherSchema);

module.exports = { otherCommunity };
