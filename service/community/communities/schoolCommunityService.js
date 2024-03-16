const {
  SchoolCommunity,
} = require("../../../models/community/communities/schoolCommunity");
const { uploadFile } = require("../../imageUpload/imageUpload");

const createSchoolCommunity = async (req) => {
  try {
    const params = {
      Bucket: "mypath--ai/communities",
      Key: req.file.originalname,
      Body: req.file.buffer,
    };
    const uploadedImageInS3 = await uploadFile(params);
    const data = new SchoolCommunity({
      domainId: req.body.domainId,
      communityName: req.body.communityName,
      communityImage: uploadedImageInS3.Location,
      visibility: req.body.visibility,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
      schoolType: req.body.schoolType,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      educationalPaths: req.body.educationalPaths,
      communityGuidelines: req.body.communityGuidelines,
      mentorshipPrograms: req.body.mentorshipPrograms,
      industryPartnerships: req.body.industryPartnerships,
      extraCurricularActivities: req.body.extraCurricularActivities,
      discussionForms: req.body.discussionForms,
      alumniNetwork: req.body.alumniNetwork,
      careerResources: req.body.careerResources,
      enableFeedback: req.body.enableFeedback,
      privacySetting: req.body.privacySetting,
      networkingOpportunities: req.body.networkingOpportunities,
    });
     return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports = { createSchoolCommunity };
