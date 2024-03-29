const mongoose = require("mongoose");
const { Community } = require("../community");

const schoolSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: { type: String, required: true },
  zipCode: {
    type: String,
    required: true,
  },
  country: { type: String, required: true },
  schoolType: {
    type: String,
    required: true,
  },
  educationalPaths: {
    type: String, //doubt
    required: true,
  },
  email: {
    type: String, //doubt
    required: true,
  },
  phoneNo: {
    type: String, //doubt
    required: true,
  },
  communityGuidelines: {
    type: String,
  },
  mentorshipPrograms: {
    type: String, //doubt
  },
  industryPartnerships: {
    type: String, //doubt
  },
  extraCurricularActivities: {
    type: String, //doubt
  },
  alumniNetwork: {
    type: String, //doubt
  },
  discussionForms: {
    type: Boolean,
    required: true,
  },
  careerResources: {
    type:[String],
    required: true,
  },
  enableFeedback: {
    type: Boolean,
    required: true,
  },
  privacySetting: {
    type: String,
  },
});
const SchoolCommunity = Community.discriminator("School", schoolSchema);
module.exports = { SchoolCommunity };
