const { community } = require("../../models/community");
const { uploadFile }=require("../imageUpload/imageUpload");

const createCommunity = async (req, res) => {
  const params = {
    bucketName: 'mypath-ai/communities',
    fileName: req.file.originalname,
    fileContent: req.file.buffer,
  };
 const uploadedImageInS3=await uploadFile(params);
 const data = new community({
    communityName: req.body.communityName,
    communityImage:uploadedImageInS3.Location
  });

  try {
    const result = await data.save();
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Community Created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
