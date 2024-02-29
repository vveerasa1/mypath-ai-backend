const mongoose = require("mongoose");
const trailblazerCriteriaSchema=mongoose.Schema({
    communityId:{
        type: Schema.Types.ObjectId,
        ref: 'community'
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
module.exports = mongoose.model("trailblazerCriteria", trailblazerCriteriaSchema);
