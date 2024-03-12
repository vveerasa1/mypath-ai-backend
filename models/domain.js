const mongoose = require("mongoose");
const domainSchema=mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  }
});
const domain = mongoose.model("domains", domainSchema);
module.exports={domain};

// const mongoose = require("mongoose");
// const domainSchema=mongoose.Schema({
//   domainName:{
//     type:String,
//     required:true,
//     unique:true
//   }
// });
// const domain = mongoose.model("domains", domainSchema);
// module.exports={domain};