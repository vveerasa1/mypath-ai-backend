const {user} = require("../../models/user");
const { jwtDecode }= require('jwt-decode');

const createUserSettings = async (req, res) => {
  try {
  const token = req.header('x-auth-token');
  const decodedToken = jwtDecode(token);
  const data = new user({
    cognitoUserId:decodedToken.sub,
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
module.exports = {
    createUserSettings,
    getUserSettings
};
