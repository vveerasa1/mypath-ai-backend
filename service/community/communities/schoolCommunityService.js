const { schoolCommunity } = require("../../../models/community/communities/schoolCommunity");
const createBuisnessCommunity=async(req)=>
{
   try{
    const data = new schoolCommunity({
    buisnessName: req.body.buisnessName,
    industry:req.body.industry,
    companySize:req.body.companySize,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    country:req.body.country,
    zipcode:req.body.zipcode,
    email:req.body.email,
    phoneNo:req.body.phoneNo,
    keyProducts:req.body.keyProducts,
    careerOpportunities:req.body.Opportunities,
    communityGuidelines:req.body.communityGuidelines,
    networkingOpportunities:req.body.networkingOpportunities,
    companyOverview:req.body.companyOverview,
    discussionForums:req.body.discussionForums,
    enableFeedback:req.body.enableFeedback,
    privacySetting:req.body.privacySetting
  });
  data.validate();
  result = await data.save();
  return Promise.resolve(result);
}
catch(error)
{
Promise.reject(error);
}
}
module.exports={createBuisnessCommunity};