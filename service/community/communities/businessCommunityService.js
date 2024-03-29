const { BusinessCommunity } = require("../../../models/community/communities/businessCommunity");
const { uploadFile } = require("../../imageUpload/imageUpload");
const createBusinessCommunity=async(req)=>
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
    const data = new BusinessCommunity({
    domainId:req.body.domainId,
    communityName:req.body.communityName,
    communityImage: uploadedImageInS3?uploadedImageInS3.Location:undefined,
    visibility:req.body.visibility,
    industry:req.body.industry,
    companySize:req.body.companySize,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    country:req.body.country,
    zipCode:req.body.zipCode,
    email:req.body.email,
    phoneNo:req.body.phoneNo,
    keyProducts:req.body.keyProducts,
    careerOpportunities:req.body.careerOpportunities,
    communityGuidelines:req.body.communityGuidelines,
    networkingOpportunities:req.body.networkingOpportunities,
    companyOverview:req.body.companyOverview,
    discussionForms:req.body.discussionForms,
    enableFeedback:req.body.enableFeedback,
    privacySetting:req.body.privacySetting
  });
  return Promise.resolve(data);
}
catch(error)
{
return Promise.reject(error);
}
}
module.exports={createBusinessCommunity};