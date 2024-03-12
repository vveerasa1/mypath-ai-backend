const { Resource } = require("../../models/community/resources");
const { uploadFile } = require("../imageUpload/imageUpload");


const addResource = async (req, res) => {
    try {
      let attachment = '';
      if (req.file) {
        const params = {
          Bucket: 'mypath--ai/communities/resources',
          Key: req.file.originalname,
          Body: req.file.buffer,
        };
  
        const uploadResponse = await uploadFile(params);
        attachment = uploadResponse.Location;
      }
  
      const resource = new Resource({
        communityId: req.params.communityId,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        attachment: attachment,
      });
  
      const result = await resource.save();
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Resource has been added successfully!',
        data: result,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to add resource',
        error: error.message,
      });
    }
  }
  
  const getResources = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const skip = (page - 1) * limit;
      const filter = {};
    
      filter.deleted = false;

      if(req.params.communityId) {
        filter.communityId = req.params.communityId;
      }
      const resources = await Resource.find(filter)
        .sort({updatedAt: -1})
        .skip(skip)
        .limit(limit)
        .exec();
  
      const totalResources = await Resource.countDocuments(filter);
  
      const totalPages = Math.ceil(totalResources / limit);
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Resources fetched successfully',
        data: {
          resources,
          totalPages,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get resources',
        error: error.message,
      });
    }
  }
  
  const getResource = async (req, res) => {
    const resourceId = req.params.resourceId;
    try {
      const resource = await Resource.findById(resourceId);
      if (!resource) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Resoure not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Resource fetched successfully',
        data: Resource,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get Resource.',
        error: error.message,
      });
    }
  
  }
  
  const updateResource = async (req, res) => {
    const resourceId = req.params.resourceId;
  
    try {
      let attachment = '';
  
      if (req.file) {
        const params = {
          Bucket: 'mypath--ai/communities/resources',
          Key: req.file.originalname,
          Body: req.file.buffer,
        };
  
        const uploadResponse = await uploadFile(params);
        attachment = uploadResponse.Location;
      }
      
      const updatedResource = await Resource.findByIdAndUpdate(
        resourceId,
        {$set:  {
          communityId: req.params.communityId,
          name: req.body.name,
          description: req.body.description,
          type: req.body.type,
          attachment: attachment || req.body.currentAttachment,
        }},
        { new: true, runValidators: true }
      );
  
      if (!updatedResource) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Resource not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Resource has been updated successfully!',
        data: updatedResource,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to update resource',
        error: error.message,
      });
    }
  }
  
  const deleteResource = async (req, res) => {
    const resourceId = req.params.resourceId;
  
    try {
      const deletedResource = await Resource.findByIdAndUpdate(
        resourceId,
        { $set: { deleted: true } },
        { new: true, runValidators: true }
      );
  
      if (!deletedResource) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Resource not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Resource has been deleted successfully!',
        data: deletedResource,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to delete resource',
        error: error.message,
      });
    }
  }
  

  module.exports = {
    addResource,
    getResource,
    getResources,
    updateResource,
    deleteResource
  };
  