const { Testimonial } = require("../../models/community/testimonials");
const { uploadFile } = require("../imageUpload/imageUpload");


const addTestimonial = async (req, res) => {
    try {

      const testimonial = new Testimonial({
        communityId: req.params.communityId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time:req.body.time
      });
  
      const result = await testimonial.save();
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Testimonial has been added successfully!',
        data: result,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to add testimonial',
        error: error.message,
      });
    }
  }
  
  const getTestimonials = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const skip = (page - 1) * limit;
      const filter = {};
    
      filter.deleted = false;

      if(req.params.communityId) {
        filter.communityId = req.params.communityId;
      }
      const testimonials = await Testimonial.find(filter)
        .sort({updatedAt: -1})
        .skip(skip)
        .limit(limit)
        .exec();
  
      const totalTestimonials = await Testimonial.countDocuments(filter);
  
      const totalPages = Math.ceil(totalTestimonials / limit);
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Testimonials fetched successfully',
        data: {
          testimonials,
          totalPages,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get testimonials',
        error: error.message,
      });
    }
  }
  
  const getTestimonial = async (req, res) => {
    const testimonialId = req.params.testimonialId;
    try {
      const testimonial = await Testimonial.findById(testimonialId);
      if (!testimonial) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Testimonial not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Testimonial fetched successfully',
        data: testimonial,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to get Testimonial.',
        error: error.message,
      });
    }
  
  }
  
  const updateTestimonial = async (req, res) => {
    const testimonialId = req.params.testimonialId;
  
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        testimonialId,
        {$set:  {
          communityId: req.params.communityId,
          title: req.body.title,
          description: req.body.description,
          time:req.body.time,
          date: req.body.date,
        }},
        { new: true, runValidators: true }
      );
  
      if (!updatedTestimonial) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Testimonial not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Testimonial has been updated successfully!',
        data: updatedTestimonial,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to update testimonial',
        error: error.message,
      });
    }
  }
  
  const deleteTestimonial = async (req, res) => {
    const testimonialId = req.params.testimonialId;
  
    try {
      const deletedTestimonial = await Testimonial.findByIdAndUpdate(
        testimonialId,
        { $set: { deleted: true } },
        { new: true, runValidators: true }
      );
  
      if (!deleteTestimonial) {
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Testimonial not found',
        });
      }
  
      res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'Testimonial has been deleted successfully!',
        data: deletedTestimonial,
      });
    } catch (error) {
      console.error('Error:', error);
  
      res.status(500).json({
        code: 500,
        status: 'Error',
        message: 'Failed to delete testimonial',
        error: error.message,
      });
    }
  }
  

  module.exports = {
    addTestimonial,
    getTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial
  };
  