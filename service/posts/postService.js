const { Posts } = require("../../models/posts/posts");
const { Community } = require("../../models/community/community");
const { user } = require("../../models/user");
const { uploadFile } = require("../imageUpload/imageUpload");
const { getcognitoUserId } = require("../user/userService");
const mongoose = require("mongoose");

const createPosts = async (req, res) => {
  try {
    if (!(req.body.userId || req.body.communityId)) {
      throw new Error("An Id is Required");
    }
    const createdPost = req.body.userId
      ? await createUserPost(req)
      : await createCommunityPost(req);
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Post Created Successfully",
      data: createdPost,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Failed to create Post.",
      error: error.message,
    });
  }
};
const createUserPost = async (req) => {
  // const session = await mongoose.startSession();
  try {
    const userId = req.body.userId;
    const requestedUser = await user.findById(userId);
    if(!requestedUser)
    {
     throw new Error("User Not Found");
    }
    let createdUserPost = new Posts({
      description: req.body.description,
      createdDate: new Date(),
      userId:requestedUser._id
    });

    // session.startTransaction();
    if (req.file) {
      const params = {
        Bucket: "mypath--ai/posts/users",
        Key: req.file.originalname,
        Body: req.file.buffer,
      };
      const uploadedImageInS3 = await uploadFile(params);
      createdUserPost.image = uploadedImageInS3.Location;
    }
    if (requestedUser) {
      const createdPost = await createdUserPost.save();
      await requestedUser.save();
      // await session.commitTransaction();
      return createdPost;
    }
  } catch (error) {
    // await session.abortTransaction();
    throw new Error(error);
  } finally {
    // session.endSession();
  }
};
const createCommunityPost = async (req) => {
  // const session = await mongoose.startSession();
  try {
    const communityId = req.body.communityId;
    const community = await Community.findById(communityId);
    if(!community)
    {
      throw new Error("Cannot Find Community");
    }
    let createdCommunityPost = new Posts({
      description: req.body.description,
      createdDate: new Date(),
      communityId:community._id
    });

    // session.startTransaction();
    if (req.file) {
      const params = {
        Bucket: "mypath--ai/posts/communities",
        Key: req.file.originalname,
        Body: req.file.buffer,
      };
      const uploadedImageInS3 = await uploadFile(params);
      createdCommunityPost.image = uploadedImageInS3.Location;
    }
    if (community) {
      const createdPost = await createdCommunityPost.save();
      await community.save();
      // await session.commitTransaction();
      return createdPost;
    }
  } catch (error) {
    // await session.abortTransaction();
    throw new Error(error);
  } finally {
    // session.endSession();
  }
};
const getAllPosts = async (req, res) => {
  try {
    const cognitoUserId=await getcognitoUserId(req);
    const userDetails = await user.findOne({cognitoUserId:cognitoUserId});
    const userId=userDetails._id;
    const posts = await Posts.aggregate([
      {
        $match: {}
      },
      {
        $addFields: {
          liked: { $in: [userId, "$likes"] },
          flag: { $in: [userId, "$flag"] },
          likes: { $size: "$likes" }
        }
      }
    ]);
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Got the Posts Successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Failed",
      message: error.message,
    });
  }
};
const likeapost=async(req,res)=>{
  try{
  const postId=req.params.postId;
  const posts = await Posts.findById(postId);
  if(!posts)
  {
    throw new Error("Cannot find the Post");
  }
  const cognitoUserId=await getcognitoUserId(req);
  const userDetails=await user.findOne({cognitoUserId:cognitoUserId});
  if(!userDetails)
  {
    throw new Error("Cannot find the User");
  }
  const hasAlreadyLikedThePost=posts.likes.find(_id=>_id.equals(userDetails._id));
  if(hasAlreadyLikedThePost)
  {
    posts.likes.pop(userDetails._id);
    await posts.save();
  }
  else{
  posts.likes.push(userDetails._id);
  await posts.save();
  }
  const likes=posts.likes.length;
  res.status(200).json({
    code: 200,
    status: "Success",
    data:{
      liked:!hasAlreadyLikedThePost,
      likes:likes
    }
  });
  }
  catch(error)
  {
    res.status(500).json({
      code: 500,
      status: "Failed",
      message: error.message,
    });
  }
}

const flagapost=async(req,res)=>
{
  try{
    const postId=req.params.postId;
    const posts = await Posts.findById(postId);
    if(!posts)
    {
      throw new Error("Cannot find the Post");
    }
    const cognitoUserId=await getcognitoUserId(req);
    const userDetails=await user.findOne({cognitoUserId:cognitoUserId});
    if(!userDetails)
    {
      throw new Error("Cannot find the User");
    }
    const hasAlreadyFlaggedThePost=posts.flag.find(_id=>_id.equals(userDetails._id));
    console.log(hasAlreadyFlaggedThePost);
    if(hasAlreadyFlaggedThePost)
    {
      posts.flag.pop(userDetails._id);
      await posts.save();
    }
    else{
    posts.flag.push(userDetails._id);
    await posts.save();
    }
    res.status(200).json({
      code: 200,
      status: "Success",
      data:{
        flagged:!hasAlreadyFlaggedThePost
      }
    });
    }
    catch(error)
    {
      res.status(500).json({
        code: 500,
        status: "Failed",
        message: error.message,
      });
    }
};

module.exports = { createPosts, getAllPosts,likeapost,flagapost};