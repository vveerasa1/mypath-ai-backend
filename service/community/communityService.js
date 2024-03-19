const { Community } = require("../../models/community/community");
const { domain } = require("../../models/domain");
const {
  createBusinessCommunity,
} = require("../community/communities/businessCommunityService");
const {
  createOtherCommunity,
} = require("../community/communities/otherCommunityService");
const { create } = require("../community/communities/otherCommunityService");
const {
  createSchoolCommunity,
} = require("./communities/schoolCommunityService");
const { SchoolCommunity } = require("../../models/community/communities/schoolCommunity");
const { BusinessCommunity } = require("../../models/community/communities/businessCommunity");
const { OtherCommunity } = require("../../models/community/communities/otherCommunity");


const createCommunity = async (req, res) => {
  try {
    const domains = await domain.findById(req.body.domainId);
    if (!domains) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Domain not found",
      });
    }

    const isCommunityNameUnique = await Community.exists({
      communityName: req.body.communityName,
    });

    if (isCommunityNameUnique) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Community name already exists.",
      });
    }
    const communityType = req.body.communityType;
    let createdCommunity;

    switch (communityType) {
      case "School":
        createdCommunity = await createSchoolCommunity(req);
        createdCommunity=await createOrUpdateCommunity(req,createdCommunity);
        break;
      case "Business":
        createdCommunity = await createBusinessCommunity(req);
        createdCommunity=await createOrUpdateCommunity(req,createdCommunity);
        break;
      case "Others":
        createdCommunity = await createOtherCommunity(req);
        createdCommunity=await createOrUpdateCommunity(req,createdCommunity);
        break;
      default:
        throw new Error("Give a Valid Community Type");
    }
    if(req.body.communityId)
    {
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Community Updated Successfully",
      data: createdCommunity,
    });
  }
  else{
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Community Created Successfully",
      data: createdCommunity,
    });
  }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Failed to create community.",
      error: error.message,
    });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { domainIds, visibility,startsWith } = req.query;
    const domainIdsArray = domainIds ? domainIds.split(",") : [];
    let filter = {status:"Active"};

    if (domainIdsArray.length > 0) {
      filter.domainId = { $in: domainIdsArray };
    }

    if (visibility) {
      filter.visibility = visibility;
    }
    if(startsWith)
    {
      filter.communityName = { $regex: `^${startsWith}`,$options: 'i'};
    }
    const communities = await Community.find(filter)
      .sort({ createdAt: -1 })
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
      status: "Error",
      message: "Failed to get communities",
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
const createOrUpdateCommunity= async (req,data)=>{
  try{
  let result;
  if (req.body.communityId) {
    let _isCommunityPresent = await Community.findOne({
      _id: req.body.communityId,
    });
    if (_isCommunityPresent) {
      const { _id, ...updatedData } = data.toObject();
      const communityType = req.body.communityType;
      switch (communityType) {
      case "School":
      result = await SchoolCommunity.findOneAndUpdate(
        { _id:req.body.communityId},
        updatedData,
        { new: true }
      );
      break;
      case "Business":
      result = await BusinessCommunity.findOneAndUpdate(
        { _id:req.body.communityId},
        updatedData,
        { new: true }
      );
      break;
      case "Others":
      result = await OtherCommunity.findOneAndUpdate(
        { _id:req.body.communityId},
        updatedData,
        { new: true }
      );
      break;
      default:
      throw new Error("Enter a Valid Community Type");
      }
      return Promise.resolve(result);
    } else {
      throw new Error("Community is not present");
    }
  } else {
    result = await data.save();
    return Promise.resolve(result);
  }
}
catch(error)
{
  return Promise.reject(error);
}
};

const deleteCommunity = async (req, res) => {
  const communityId = req.params.communityId;

  try {
    const deletedCommunity = await Community.findByIdAndUpdate(
      communityId,
      { $set: { status: 'Deleted' } },
      { new: true, runValidators: true }
    );
    if (deletedCommunity) {
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Community has been deleted successfully!',
        data: deletedCommunity,
      });
    }
    else
    {
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to delete community',
      });
    }

  
  } catch (error) {
    console.error('Error:', error);

    res.status(500).json({
      code: 500,
      status: 'Error',
      message: 'Failed to delete community',
      error: error.message,
    });
  }
}

module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  deleteCommunity,
};
