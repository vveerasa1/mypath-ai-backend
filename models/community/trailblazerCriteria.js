const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailblazerCriteriaSchema=mongoose.Schema({
    communityId:{
        type: Schema.Types.ObjectId,
        ref: 'communities',
        unique:true
    },
    tier:{
        type: Number,
        required: [true,"Tier is required"],
        validate: {
            validator: Number.isInteger,
            message: 'Tier must be an integer (no decimals)'
        }
    },
    noOfMembers:{
        type:Number,
        required: [true,"NoOfMembers is required"],
        validate: {
            validator: Number.isInteger,
            message: 'NoOfMembers must be an integer (no decimals)'
        }
    },
    engagement:{
        type:Number,
        required: [true,"Engagement is required"],
        validate: {
            validator: function(value) {
                return Number.isFinite(value);
            },
            message: 'Engagement must be an Number'
        }
    },
    activityLevel:{
        type:Number,
        required:[true,"ActivityLevel is required"],
        validate: {
            validator: function(value) {
                return Number.isFinite(value);
            },
            message: 'ActivityLevel must be an Number'
        }
    },
    noOfFollowers:{
        type:Number,
        required: [true,"NoOfFollowers is required"],
        validate: {
            validator: Number.isInteger,
            message: 'NoOfFollowers must be an integer (no decimals)'
        }
    },
    yieldPercentage:{
        type:Number,
        required: [true,"YieldPercentage is required"],
        validate: {
            validator: function(value) {
                return Number.isFinite(value);
            },
            message: 'YieldPercentage must be an Number'
        
        }
    },
    trailblazerPercentage:{
        type:Number,
        required: [true,"TrailblazerPercentage is required"],
        validate: {
            validator: function(value) {
                return Number.isFinite(value);
            },
            message: 'TrailblazerPercentage must be an Number'
        }
    }

});

trailblazerCriteriaSchema.pre('save', async function(next) {
    const Community = mongoose.model('communities');
    const community = await Community.findById(this.communityId);
    if (!community) {
        throw new Error('Community does not exist');
    }
    next();
});


const trailblazerCriteria = mongoose.model("trailblazercriterias", trailblazerCriteriaSchema);
module.exports={trailblazerCriteria};