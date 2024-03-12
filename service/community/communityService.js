const { community } = require("../../models/community/community");
const { uploadFile }=require("../imageUpload/imageUpload");
const { createDomain }= require("../domain/domainService");
const { createBuisnessCommunity }=require("../community/communities/buisnessCommunityService")
const createCommunity = async (req, res) => {
  const domain=await createDomain(req);
    const params = {
    Bucket: 'mypath--ai/communities',
    Key: req.file.originalname,
    Body: req.file.buffer,
  };
 const uploadedImageInS3=await uploadFile(params);
 const data = new community({
    domainId:domain._id,
    communityName: req.body.communityName,
    communityImage:uploadedImageInS3.Location,
    communityType:req.body.communityType,
    communityCoverage:req.body.communityCoverage
  });
    await data.validate();
    const createdCommunity = await data.save();
    req.body.communityId=createdCommunity._id;
    const communityType=req.body.communityType;
  if(communityType==="School")
  {
    
  }
  else if(communityType==="Buisness")
  {
    const createdBuisnessCommunity=await createBuisnessCommunity(req);
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Community Created Successfully",
      data:{...domain,...createdCommunity,...createdBuisnessCommunity}
    });
  }
  else if(communityCoverage==="Others")
  {
    
  }
  // console.log(domain);
  //   res.status(200).json({
  //     code: 200,
  //     status: "Success",
  //     message: "Domain Created successfully",
  //     data: domain,
  //   });


};

const getAllCommunities = async (req, res) => {
  try {
    const communities = await community.find({});
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Retrieved all the Communities Sucessfully",
      data: communities,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCommunityById = async (req, res) => {
  const communityId = req.params.communityId;
  try {
    const requestedCommunity = await community.findById(communityId);
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Retrieved the Community Sucessfully",
      data: requestedCommunity,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
};
