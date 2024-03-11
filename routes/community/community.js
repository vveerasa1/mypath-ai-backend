const express = require("express");
const { getAllCommunities, createCommunity, getCommunityById } = require("../../service/community/communityService");
const { addEvent, getEvent, getEvents, updateEvent, deleteEvent, cancelEvent } = require("../../service/community/eventService");
const { addResource, getResoures, getResoure, updateResource, deleteResource } = require("../../service/community/resourceService");
const  {createTrailblazerCriteria}  = require("../../service/community/trailblazerCriteria/trailblazerCriteriaService");
const { verifyToken } = require("../../jwt/jwtVerification");
const multer =require('multer');
const file = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

const router = express.Router();
router.post("/",[file.single('file'),createCommunity]);
router.post("/:communityId/trailblazer-criteria",verifyToken,createTrailblazerCriteria);
router.get("/",getAllCommunities);
router.get("/:communityId",getCommunityById);
router.post("/:communityId/events", [file.single('file'), addEvent]);
router.get("/:communityId/events/:eventId", getEvent);
router.get("/:communityId/events", getEvents);
router.put("/:communityId/events/:eventId", [file.single('file'), updateEvent]);
router.delete("/:communityId/events/:eventId", deleteEvent);
router.put("/:communityId/events/:eventId/cancel", cancelEvent);
router.post("/:communityId/resources", [file.single('file'), addResource]);
router.get("/:communityId/resources/:resourceId", getResoure);
router.get("/:communityId/resources", getResoures);
router.put("/:communityId/resources/:resourceId", [file.single('file'), updateResource]);
router.delete("/:communityId/resources/:resourceId", deleteResource);

module.exports = router;
