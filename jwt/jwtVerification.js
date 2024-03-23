const { CognitoJwtVerifier } =require("aws-jwt-verify");
const config= require('../config');
const aws = require('aws-sdk');


// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: config.amplifyConfig.userPoolId,
  tokenUse: "access",
  clientId: config.amplifyConfig.clientId,
});

const provider =  new aws.CognitoIdentityServiceProvider({
  userPoolId: config.amplifyConfig.userPoolId,
  clientId: config.amplifyConfig.clientId,
  region:'us-east-1'
});

const verifyToken = async (req, res, next) => {
    try {
      const token = req.header('x-auth-token');
      if (!token) return res.status(401).send(`Access denied.  No token provided`);
      const payload = await verifier.verify(token); // the JWT as string
      if (payload) {
        next(); // Token is valid, continue to the next middleware or route handler
      } else {
        res.status(400).send(`Invalid token.`);
      }
    } catch (error) {
        res.status(400).send(`Invalid token.`);
        // Pass any errors to the Express error handler
    }
  };
  
module.exports={verifyToken,provider};