const mongoose = require("mongoose");
const communitySchema=mongoose.Schema({
  communityName:{
    type:String,
    required:true
  },
  communityImage:{
    type:String,
    required:true
  }
});
const community = mongoose.model("communities", communitySchema);
module.exports={community};