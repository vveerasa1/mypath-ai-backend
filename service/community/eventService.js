const { community } = require("../../models/community/community");
const { Event } = require("../../models/community/events");
const { uploadFile } = require("../imageUpload/imageUpload");


/**
 * Add new event with file attachement.
 * 
 * @param {*} req 
 * @param {*} res 
 */
const addEvent = async (req, res) => {
    try {
      let attachment = '';
      if (req.file) {
        const params = {
          Bucket: 'mypath--ai/communities/events',
          Key: req.file.originalname,
          Body: req.file.buffer,
        };
  
        const uploadResponse = await uploadFile(params);
        attachment = uploadResponse.Location;
      }
  
      const event = new Event({
        communityId: req.params.communityId,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
        attachment: attachment,
      });
  
      const result = await event.save();
      console.log(`Event has been added for the community ${communityId}: ${event._id}`)
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Event has been added successfully!',
        data: result,
      });
    } catch (error) {
      console.error(`Error adding event for the community ${communityId}: ${error}`);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to add event',
        error: error.message,
      });
    }
  }
  

  /**
   * Get all the events based on the filters community, start and end date, status
   * 
   * @param {*} req 
   * @param {*} res 
   */
  const getEvents = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const skip = (page - 1) * limit;
      const filter = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }

    if(req.params.communityId) {
      filter.communityId = req.params.communityId;
    }

    if (req.query.startDate) {
        filter.eventDate = { $gte: new Date(req.query.startDate) };
      }
  
      if (req.query.endDate) {
        filter.eventDate = { ...filter.eventDate, $lte: new Date(req.query.endDate) };
      }
  
      const events = await Event.find(filter)
        .sort({updatedAt: -1})
        .skip(skip)
        .limit(limit)
        .exec();
  
      const totalEvents = await Event.countDocuments(filter);
  
      const totalPages = Math.ceil(totalEvents / limit);
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Events fetched successfully',
        data: {
          events,
          totalPages,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error(`Error getting events: ${error}`);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get events',
        error: error.message,
      });
    }
  }
  
  /**
   * Get event by the id of the event.
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  const getEvent = async (req, res) => {
    const eventId = req.params.eventId;
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Event not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Event fetched successfully',
        data: event,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get event.',
        error: error.message,
      });
    }
  
  }
  

  /**
   * Update the event with new information.
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  const updateEvent = async (req, res) => {
    const eventId = req.params.eventId;
  
    try {
      let attachment = '';
  
      if (req.file) {
        const params = {
          Bucket: 'mypath--ai/communities/events',
          Key: req.file.originalname,
          Body: req.file.buffer,
        };
  
        const uploadResponse = await uploadFile(params);
        attachment = uploadResponse.Location;
      }
      console.log(req.body);
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {$set:  {
          communityId: req.params.communityId,
          name: req.body.name,
          description: req.body.description,
          type: req.body.type,
          eventDate: req.body.eventDate,
          eventTime: req.body.eventTime,
          attachment: attachment || req.body.currentAttachment,
        }},
        { new: true, runValidators: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Event not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Event has been updated successfully!',
        data: updatedEvent,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to update event',
        error: error.message,
      });
    }
  }
  

  /**
   * Delete event by event id.
   * 
   * @param {\} req 
   * @param {*} res 
   * @returns 
   */
  const deleteEvent = async (req, res) => {
    const eventId = req.params.eventId;
  
    try {
      const deletedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $set: { status: 'Deleted' } },
        { new: true, runValidators: true }
      );
  
      if (!deletedEvent) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Event not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Event has been deleted successfully!',
        data: deletedEvent,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to delete event',
        error: error.message,
      });
    }
  }
  

  /**
   * Update the status of the event has cancelled.
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  const cancelEvent = async (req, res) => {
    const eventId = req.params.eventId;
  
    try {
      const deletedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $set: { status: 'Cancelled' } },
        { new: true, runValidators: true }
      );
  
      if (!deletedEvent) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Event not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Event has been cancelled successfully!',
        data: deletedEvent,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to cancel event',
        error: error.message,
      });
    }
  }
  

  module.exports = {
    addEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    cancelEvent
  };
  