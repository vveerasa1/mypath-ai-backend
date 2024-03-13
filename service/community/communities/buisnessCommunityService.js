const { buisnessCommunity } = require("../../../models/community/communities/buisnessCommunity");
const createBuisnessCommunity=async(req)=>
{
   try{
    const data = new buisnessCommunity({
    buisnessName: req.body.buisnessName,
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



// const { buisnessCommunity } = require("../../../models/community/communities/buisnessCommunity");
// const createBuisnessCommunity=async(req)=>
// {
//    try{
//     const{ domainId, communityName, communityImage, communityType,visibility}=req.body.createdCommunity;
//     const data = new buisnessCommunity({
//     domainId:domainId.toString(),
//     communityName:communityName,
//     communityImage:communityImage,
//     communityType:communityType,
//     visibility:visibility,
//     buisnessName: req.body.buisnessName,
//   });
//   console.log(data);
//   //  data.validate();
//   result = await data.save();
//   console.log(result);
//   return Promise.resolve(result);
// }
// catch(error)
// {
// Promise.reject(error);
// }
// }
// module.exports={createBuisnessCommunity};