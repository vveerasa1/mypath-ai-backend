const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailblazerCriteriaSchema=mongoose.Schema({
    communityId:{
        type: Schema.Types.ObjectId,
        ref: 'communities'
    },
    tier:{
        type: Number,
        required: true,
    },
    noOfMembers:{
        type:Number,
        required: true,
    },
    engagement:{
        type:Number,
        required: true,
    },
    activityLevel:{
        type:Number,
        required: true,
    },
    noOfFollowers:{
        type:Number,
        required: true,
    },
    yieldPercentage:{
        type:Number,
        required: true,
    },
    trailblazerPercentage:{
        type:Number,
        required: true,
    }

});
const trailblazerCriteria = mongoose.model("trailblazerCriterias", trailblazerCriteriaSchema);
module.exports={trailblazerCriteria};