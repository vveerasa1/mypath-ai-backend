const { CognitoJwtVerifier } =require("aws-jwt-verify");
const config= require('../config/local.json');

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-1_5RgmfErcR",
  tokenUse: "access",
  clientId: "1pr3h4lv6ot36k6khcfs656vp1",
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
  
module.exports={verifyToken};