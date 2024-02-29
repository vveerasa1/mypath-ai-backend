const {trailblazerCriteria} = require("../../models/trailblazerCriteria");

const createTrailblazerCriteria = async (req, res) => {
  const data = new trailblazerCriteria({
    communityId: req.params.communityId,
    tier:req.body.tier,
    noOfMembers:req.body.noOfMembers,
    engagement:req.body.engagement,
    activityLevel:req.body.activityLevel,
    noOfFollowers:req.body.noOfFollowers,
    yieldPercentage:req.body.yieldPercentage,
    trailblazerPercentage:req.body.trailblazerPercentage
  });
  try {
    const result = await data.save();
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Trailblazercriteria created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    createTrailblazerCriteria,
};
