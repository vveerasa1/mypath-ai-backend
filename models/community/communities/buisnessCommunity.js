const mongoose = require("mongoose");
const { Community } = require("../community");

const buisnessSchema = mongoose.Schema({
  buisnessName:{
    type: String,
    required: true,
  },
  industry:{
    type: String,
    required: true,
  },
  companySize:{
    type: Number,
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
  zipCode:{
    type: String,
    required: true

  },
  email:{
    type: String, //doubt
    required: true,
  },
  phoneNo:{
    type: String, //doubt
    required: true,
  },
  keyProducts:{
    type: String,
  },
  careerOpportunities:{
    type: String, //doubt
  },
  communityGuidelines:{
    type: String, //doubt
  },
  networkingOpportunities:{
    type: String, //doubt
  },
  companyOverview:{
    type: String, //doubt
  },
  discussionForums:{
    type:Boolean,
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
const BuisnessCommunity = Community.discriminator("Buisness", buisnessSchema);
module.exports = { BuisnessCommunity };