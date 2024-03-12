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


const getDomains = async (req, res) => {
  try{
    const domains = await domain.find({});
    res.status(200).json({
      code: 200,
      status: 'Success',
      message: 'Domains fetched successfully',
      data: domains,
    });
  } catch(error) {
    console.error(`Error getting domains: ${error}`);
    res.status(500).json({
      code: 500,
      status: 'Error',
      message: 'Failed to get domains',
      error: error.message,
    });
  } 
}

const getDomain = async (req, res) => {
  const domainId = req.body.domainId;
    try {
      const domains = await domain.findById(domainId);
      if (!domains) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Domain not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Domain fetched successfully',
        data: domains,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get domain.',
        error: error.message,
      });
    }
}
  
  module.exports = {
      createDomain,
      getDomains,
      getDomain
  };
  