const mongoose = require("mongoose");

const statusEnum = ['Cancelled', 'Deleted', 'Active'];

const eventSchema = mongoose.Schema({
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "communities",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime:{
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: statusEnum,
    default: 'Active'
  }
}, { timestamps: true });
const Event = mongoose.model("event", eventSchema);

module.exports = { Event };
