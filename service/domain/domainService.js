const {domain} = require("../../models/domain");
const mongoose = require("mongoose");

const createDomain = async (req) => {
    try{
    if(!req.body.domainId)
    {
    const data = new domain({
     domainName:req.body.domainName
    });
    await data.validate();
    result = await data.save();
    console.log(result);
    return Promise.resolve(result);
  }
  else{
    const domainId=req.body.domainId;
    let _isdomainPresent=await domain.findOne({ _id:domainId});
    return _isdomainPresent?Promise.resolve(_isdomainPresent):Promise.reject();
  }
}
catch(error)
{
  Promise.reject(error);
}
};
  
  module.exports = {
      createDomain,
  };
  