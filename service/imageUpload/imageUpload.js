const AWS = require("aws-sdk");
const fs = require("fs");
const config = require("../../config/local.json");
const s3 = new AWS.S3({
  accessKeyId: `${config.aws.AccessKeyId}`,
  secretAccessKey: `${config.aws.secretAccessKey}`,
});

const uploadFile = async (parameters) => {
  const fileContent = fs.readFileSync(parameters.fileName);

  const params = {
    Bucket: parameters.bucketName,
    Key: parameters.fileName,
    Body: fileContent,
  };

  const data = await new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
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
