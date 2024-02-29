const {community} = require("../../models/community");

const createCommunity = async (req, res) => {
  const data = new community({
    communityName: req.body.communityName,
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

module.exports = {
  createCommunity,
};
