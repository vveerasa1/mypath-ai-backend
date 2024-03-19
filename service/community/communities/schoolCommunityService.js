const {
  SchoolCommunity,
} = require("../../../models/community/communities/schoolCommunity");
const { uploadFile } = require("../../imageUpload/imageUpload");

const createSchoolCommunity = async (req) => {
  try {
    let uploadedImageInS3;
    if(req.file){
    const params = {
      Bucket: "mypath--ai/communities",
      Key: req.file.originalname,
      Body: req.file.buffer,
    };
    uploadedImageInS3= await uploadFile(params);
  }
    const data = new SchoolCommunity({
      domainId: req.body.domainId,
      communityName: req.body.communityName,
      communityImage: uploadedImageInS3?uploadedImageInS3.Location:undefined,
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
