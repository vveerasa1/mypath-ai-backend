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
      audience:req.body.audience,
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
      audience:req.body.audience,
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
    if(!req.params.userId)
    {
      throw new Error("Please give a UserId");
    }
    let userId=req.params.userId;
    const userDetails = await user.findById(userId);
    if(!userDetails)
    {
      throw new Error("User is not present");
    }
    userId=userDetails._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const posts = await Posts.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $lookup: {
          from: "communities",
          localField: "communityId",
          foreignField: "_id",
          as: "community"
        }
      },   
      {
        $addFields: {
          follow: {
            $cond: {
              if: { $ne: ["$userId", null] },
              then: {
                $in: ["$userId", userDetails.following]
              },
              else: {
                $in: ["$communityId", userDetails.communities]
              }
            }
          },
          userInfo: {
            $cond: {
              if: { $ne: ["$userId", null] },
              then: {
                $arrayElemAt: ["$user", 0]
              },
              else: {}
            }
          },
          communityInfo: {
            $cond: {
              if: { $ne: ["$communityId", null] },
              then: {
                $arrayElemAt: ["$community", 0]
              },
              else: {}
            }
          },
          liked: { $in: [userId, "$likes"] },
          flagged: { $in: [userId, "$flag"] },
          likes: { $size: "$likes" },
          flags: { $size: "$flag" },
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments"
        }
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" } // Count the number of comments for each post
        }
      },
      {
        $addFields: {
          currentTime: { $toDate: Date.now() }, // Convert current time to Date type
          createdDateTime: { $toDate: "$createdDate" } // Convert createdDate to Date type
        }
      },
      {
        $addFields: {
          timeDifference: {
            $subtract: [
              { $toDate: "$currentTime" },
              { $toDate: "$createdDateTime" }
            ] // Calculate time difference in milliseconds
          }
        }
      },
      {
        $addFields: {
          timeDifferenceInSeconds: { $divide: ["$timeDifference", 1000] } // Convert time difference to seconds
        }
      },
      {
        $addFields: {
          timeFormatted: {
            $cond: {
              if: { $lt: ["$timeDifferenceInSeconds", 60] }, // Less than 1 minute
              then: { $concat: [{ $toString: "$timeDifferenceInSeconds" }, " seconds ago"] },
              else: {
                $cond: {
                  if: { $lt: ["$timeDifferenceInSeconds", 3600] }, // Less than 60 minutes
                  then: { $concat: [{ $toString: { $floor: { $divide: ["$timeDifferenceInSeconds", 60] } } }, " minutes ago"] },
                  else: {
                    $cond: {
                      if: { $lt: ["$timeDifferenceInSeconds", 86400] }, // Less than 24 hours
                      then: { $concat: [{ $toString: { $floor: { $divide: ["$timeDifferenceInSeconds", 3600] } } }, " hours ago"] },
                      else: {
                        $cond: {
                          if: { $lt: ["$timeDifferenceInSeconds", 2592000] }, // Less than a month (30 days)
                          then: { $concat: [{ $toString: { $floor: { $divide: ["$timeDifferenceInSeconds", 86400] } } }, " days ago"] },
                          else: {
                            $cond: {
                              if: { $lt: ["$timeDifferenceInSeconds", 31536000] }, // Less than a year (365 days)
                              then: { $concat: [{ $toString: { $floor: { $divide: ["$timeDifferenceInSeconds", 2592000] } } }, " months ago"] },
                              else: { // More than a year
                                $concat: [
                                  { $toString: { $floor: { $divide: ["$timeDifferenceInSeconds", 31536000] } } },
                                  " years ago"
                                ]
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          description: 1,
          likes: 1,
          flags: 1,
          liked:1,
          flagged:1,
          commentCount:1,
          createdDate: 1,
          image: 1,
          follow: 1,
          userInfo: { image: 1, username: 1 },
          communityInfo: { communityImage: 1, communityName: 1 },
          timeFormatted:1
        }
      }
    ]).sort({ createdDate: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  const totalPosts = await Posts.countDocuments();

  const totalPages = Math.ceil(totalPosts / limit);;
   
  res.status(200).json({
      code: 200,
      status: "Success",
      message: "Got the Posts Successfully",
      data:{
        posts,
        totalPages,
        currentPage: page,
      },
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
// {
//   $match: {}
// },
// {
//   $lookup: {
//       from: "Users",
//       localField: "userId",
//       foreignField: "_id",
//       as: "user"
//   }
// },
// {
//   $addFields: {
//       liked: { $in: [userId, "$likes"] }, // Check if current user liked the post
//       flagged: { $in: [userId, "$flag"] }, // Check if current user flagged the post
//       following: {
//           $cond: {
//               if: { $ne: [{ $type: "$userId" }, "missing"] }, // Check if userId exists
//               then: { $in: [userId, "$user.following"] }, // Check if current user follows the user associated with the post
//               else: { $in: [userId, "$user.communities"] } // Check if current user follows the community associated with the post
//           }
//       },
//       likes: { $size: "$likes" },
//       flag: { $size: "$flag" }

//   }
// },
// {
// $project: {
//     _id: 1,
//     description: 1,
//     likes: 1,
//     flag: 1,
//     createdDate: 1,
//     image: 1,
//     liked: 1,
//     flag: 1,
//     following: 1,
//     likes:1,
//     flagged:1
// }
// }