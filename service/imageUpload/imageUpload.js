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
const getFile=async (parameters) => {
const data = await new Promise((resolve, reject) => {
  const parts=parameters.Key.split('/');
  const fileName = parts[parts.length - 1];
  parameters.Key=fileName;
s3.getObject(parameters, (err, data) => {
  if (err) {
    console.error(err);
    reject(err);
  }
  console.log("File downloaded successfully");
  resolve(data.Body.toString('base64'));
//  fs.writeFile(`${fileName}`, data.Body, (err) => {
//     if (err) {
// reject(err);
//     }
//     console.log('File downloaded successfully');
//     resolve(data.Body);
//   });
});
});
return data;
}
module.exports = { uploadFile, s3 , getFile };
