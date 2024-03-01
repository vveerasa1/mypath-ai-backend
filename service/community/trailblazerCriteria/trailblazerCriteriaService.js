const {trailblazerCriteria} = require("../../../models/trailblazerCriteria");

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
    await data.validate();
    let _isCriteriaPresent=await trailblazerCriteria.findOne({communityId:data.communityId});
    let result;
    if(_isCriteriaPresent)
    {
        const{_id,...updatedData}=data._doc;
        result= await trailblazerCriteria.findOneAndUpdate({ communityId: data.communityId },updatedData, { new: true });
         res.status(200).json({
            code: 200,
            status: "Success",
            message: "Trailblazercriteria is Updated Successfully",
            data: result,
          });
    }
    else{
    result = await data.save();
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Trailblazercriteria Created Successfully",
      data: result,
    });
    }
  } catch (error) {
    res.status(400).json({ status:"Error",message: error.message });
  }
};

module.exports = {
    createTrailblazerCriteria,
};
