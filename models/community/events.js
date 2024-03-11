const mongoose = require("mongoose");
const eventsSchema = mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime:{
    type: Date,
    required: true,
  },
  eventFile: {
    type: String,
    required: true,
  },
});
const events = mongoose.model("events", eventsSchema);

module.exports = { events };
