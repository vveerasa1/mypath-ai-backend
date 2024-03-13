const { OtherCommunity } = require("../../../models/community/communities/otherCommunity");
const { uploadFile } = require("../../imageUpload/imageUpload");
const createOtherCommunity=async(req)=>
{
   try{
      const params = {
      Bucket: 'mypath--ai/communities',
      Key: req.file.originalname,
      Body: req.file.buffer,
    };
    const uploadedImageInS3 = await uploadFile(params);
    const data = new OtherCommunity({
    domainId:req.body.domainId,
    communityName:req.body.communityName,
    communityImage:uploadedImageInS3.Location,
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
  result = await data.save();
  return Promise.resolve(result);
}
catch(error)
{
return Promise.reject(error);
}
}
module.exports={createOtherCommunity};