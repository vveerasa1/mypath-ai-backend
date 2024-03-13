const { Community } = require("../../models/community/community");
const {domain} = require("../../models/domain");

const { uploadFile } = require("../imageUpload/imageUpload");
const { createDomain, getDomain } = require("../domain/domainService");
const { createBuisnessCommunity } = require("../community/communities/buisnessCommunityService")


const createCommunity = async (req, res) => {
  try{
    const domains = await domain.findById(req.body.domainId);
    if (!domains) {
      return res.status(404).json({
        code: 404,
        status: 'Not Found',
        message: 'Domain not found',
      });
    }

    const isCommunityNameUnique = await Community.exists({ communityName: req.body.communityName });

    if (isCommunityNameUnique) {
      return res.status(400).json({
        code: 400,
        status: 'Bad Request',
        message: 'Community name already exists.',
      });
    }
  
    // const params = {
    //   Bucket: 'mypath--ai/communities',
    //   Key: req.file.originalname,
    //   Body: req.file.buffer,
    // };
    // const uploadedImageInS3 = await uploadFile(params);
    // const data = new Community({
    //   domainId: domains._id,
    //   communityName: req.body.communityName,
    //   communityImage: uploadedImageInS3.Location,
    //   communityType: req.body.communityType,
    //   visibility: req.body.visibility
    // });

    // await data.validate();

    // const createdCommunity = await data.save();    
    // req.body.communityId = createdCommunity._id;
    const communityType = req.body.communityType;
    if (communityType === "School") {
  
    }
    else if (communityType === "Buisness") {
      const createdBuisnessCommunity = await createBuisnessCommunity(req);
      res.status(200).json({
        code: 200,
        status: "Success",
        message: "Community Created Successfully",
        data: {}
      });
    }
    else if (communityType === "Others") {
  
    }
  } catch(error) {
    console.error('Error:', error);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to create community.',
        error: error.message,
      });
  }
};

const getAllCommunities = async (req, res) => {
  try {

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const { domainIds, visibility } = req.query;
      const domainIdsArray = domainIds ? domainIds.split(',') : [];
      let filter = {};

      if (domainIdsArray.length > 0) {
        filter.domainId = { $in: domainIdsArray };
      }

      if (visibility) {
        filter.visibility = visibility;
      }

    const communities = await Community.find(filter)
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .exec();

    const totalCommunities = await Community.countDocuments(filter);
  
    const totalPages = Math.ceil(totalCommunities / limit);

    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Retrieved all the Communities Sucessfully",
      data: {
        communities,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error(`Error getting communities: ${error}`);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get communities',
        error: error.message,
      });
  }
};

const getCommunityById = async (req, res) => {
  const communityId = req.params.communityId;
  try {
    const requestedCommunity = await Community.findById(communityId);
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
