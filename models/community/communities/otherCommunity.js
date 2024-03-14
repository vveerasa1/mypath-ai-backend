const mongoose = require("mongoose");
const { Community } = require("../community");

const otherSchema = mongoose.Schema({
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
    type:Boolean
      },

});
const OtherCommunity = Community.discriminator("Others", otherSchema);
module.exports = { OtherCommunity };