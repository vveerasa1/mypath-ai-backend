const mongoose = require("mongoose");
const resourcesSchema = mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  resourcesName: {
    type: String,
    required: true,
  },
  resourcesType:{
    type: String,
    required: true,
  },
  resourcesFile: {
    type: String,
    required: true,
  },
});
const events = mongoose.model("events", eventsSchema);

module.exports = { events };
