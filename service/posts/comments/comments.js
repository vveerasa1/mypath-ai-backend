const { Comments } = require("../../../models/posts/comments/comments");
const {user}=require("../../../models/user");
const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body._id;
    const userDetails= user.findById(userId);
    if(!userDetails)
    {
        throw new Error("User Not Found");
    }
    const comment = req.body.comment;
    const comments = new Comments({
      postId: postId,
      userId: userId,
      comment: comment,
    });
    const result = await comments.save();
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "Commented Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Failed",
      message: error.message,
    });
  }
};

const getAllComments=async(req,res)=>
{
    try{
    const postId=req.params.postId;
    const result=await Comments.find({postId:postId});
    res.status(200).json({
        code: 200,
        status: "Success",
        message: "Fetched all the Comments of the Post Successfully",
        data: result,
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
module.exports = { createComment,getAllComments };
