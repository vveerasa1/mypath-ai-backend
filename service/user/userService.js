const {user} = require("../../models/user");

const createUserSettings = async (req, res) => {
  const data = new user({
    language:req.body.language,
    backgroundMode:req.body.backgroundMode
  });
  try {
    const result = await data.save();
    res.status(200).json({
      code: 200,
      status: "Success",
      message: "User Data Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    createUserSettings,
};
