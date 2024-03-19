const { OtherCommunity } = require("../../../models/community/communities/otherCommunity");
const { Community } = require("../../../models/community/community");
const { uploadFile } = require("../../imageUpload/imageUpload");

const createOtherCommunity=async(req)=>
{
   try{
    let uploadedImageInS3;
    if(req.file){
    const params = {
      Bucket: "mypath--ai/communities",
      Key: req.file.originalname,
      Body: req.file.buffer,
    };
    uploadedImageInS3= await uploadFile(params);
  }
    const data = new OtherCommunity({
    domainId:req.body.domainId,
    communityName:req.body.communityName,
    communityImage: uploadedImageInS3?uploadedImageInS3.Location:undefined,
    description:req.body.description,
    visibility:req.body.visibility,
    topics:req.body.topics,
    rules:req.body.rules,
    moderatorInformation:req.body.moderatorInformation,
    networkingOpportunities:req.body.networkingOpportunities,
    mentorProfiles:req.body.mentorProfiles,
    discussionForms:req.body.discussionForms,
    searchFunctionality:req.body.searchFunctionality,
    membershipTiers:req.body.membershipTiers,
    enableFeedback:req.body.enableFeedback,
    privacy:req.body.privacy,
  });
  return Promise.resolve(data);
}
catch(error)
{
return Promise.reject(error);
}
}
module.exports={createOtherCommunity};