const { Community } = require("../../models/community/community");
const {user} = require("../../models/user");
const { jwtDecode }= require('jwt-decode');
const mongoose = require('mongoose');

const createUserSettings = async (req, res) => {
  try {
  const cognitoUserId=await getcognitoUserId(req);
  const data = new user({
    cognitoUserId:cognitoUserId,
    language:req.body.language,
    backgroundMode:req.body.backgroundMode
  });
    await data.validate();
    let _isUserPresent=await user.findOne({cognitoUserId:data.cognitoUserId});
    let result;
    if(_isUserPresent)
    {
        const{_id,...updatedData}=data._doc;
        result= await user.findOneAndUpdate({ cognitoUserId:data.cognitoUserId },updatedData, { new: true });
         res.status(200).json({
            code: 200,
            status: "Success",
            message: "UserDetails is Updated Successfully",
            data: result,
          });
    }
    else{
    result = await data.save();
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "UserDetails Created Successfully",
      data: result,
    });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUserSettings = async (req, res) => {
  try {
  const token = req.header('x-auth-token');
  const decodedToken = jwtDecode(token);
  const cognitoUserId=decodedToken.sub;
  const userDetails = await user.findOne({cognitoUserId:cognitoUserId});
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Retrieved User Sucessfully",
      data: userDetails,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const followCommunity=async(req,res)=>
{
  try{
    const cognitoUserId=await getcognitoUserId(req);

  let communityId;
  if(!req.params.communityId)
  {
    throw new Error("Please Give a CommunityId");
  }
  communityId=req.params.communityId;
  const community=await Community.findById(communityId);
  if(!community)
  {
    throw new Error("Cannot Find Commmunity");
  }
  const userDetails = await user.findOne({cognitoUserId:cognitoUserId});
  if(!userDetails)
  {
    throw new Error("Cannot Find The User");
  }
    const following=userDetails.communities.find(_id=>_id.equals(community._id))?false:true;
    console.log()
    if(following)
    {
      userDetails.communities.push(community._id);
      await userDetails.save();
      await community.save();
      res.status(200).json({
        code:200,
        status:"Success",
        message:`Following the Community ${community.communityName}`,
        data:{following:following}
      })
    }
    else{
    userDetails.communities.pop(community._id);
    await userDetails.save();
    await community.save();
    res.status(200).json({
      code:200,
      status:"Success",
      message:`UnFollowed the Community ${community.communityName}`,
      data:{following:following}
    })
    }
  }

catch(error)
{
  res.status(500).json({
    code:500,
    status:"Failed",
    message:error.message
  })
}
}
const followUser=async(req,res)=>
{
  try{
  const followerUserId= req.params.followerId;
  const cognitoUserId=  await getcognitoUserId(req);
  const userDetails = await user.findOne({cognitoUserId:cognitoUserId});
  if(!userDetails)
  {
    throw new Error("User Not Found");
  }
  const followerDetails = await user.findById(followerUserId);
  if(!followerDetails)
  {
    throw new Error("Follower Not Found");
  }
  const following=userDetails.following.find(_id=>_id.equals(followerDetails._id))?false:true;
  if(following)
  {
    userDetails.following.push(followerDetails._id);
    await userDetails.save();
    res.status(200).json({
      code:200,
      status:"Success",
      message:`Following the User ${followerDetails._id}`,
      data:{following:following}
    })
  }
  else{
    userDetails.following.pop(followerDetails._id);
    await userDetails.save();
    res.status(200).json({
      code:200,
      status:"Success",
      message:`UnFollowed the User ${followerDetails._id}`,
      data:{following:following}
    })
  }

  }
  catch(error)
{
  res.status(500).json({
    code:500,
    status:"Failed",
    message:error.message
  })
}
};
const getcognitoUserId=async(req)=>
{
  try{
  const token = req.header('x-auth-token');
  const decodedToken = jwtDecode(token);
  return decodedToken.sub;
  }
  catch(error)
  {
    throw new Error(error);
  }
};
module.exports = {
    createUserSettings,
    getUserSettings,
    followCommunity,
    followUser,
    getcognitoUserId
};
