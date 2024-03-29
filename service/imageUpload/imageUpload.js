const AWS = require("aws-sdk");
const fs = require("fs");
const config = require("../../config");
const s3 = new AWS.S3({
  accessKeyId: config.aws.AccessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region:'us-west-2',
  ACL: "public-read",
});

const uploadFile = async (parameters) => {
  const data = await new Promise((resolve, reject) => {
    s3.upload(parameters, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject("Error uploading file");
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(data);
      }
    });
  });
  return data;
};
module.exports = { uploadFile, s3 };
