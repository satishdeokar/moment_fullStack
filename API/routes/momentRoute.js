const express = require("express");
const router = express.Router();
const momentController = require('../controllers/momentController');

router.post("/create", momentController.createMoment);
router.get("/getMoments" , momentController.getMoments);
router.get("/getMoment" , momentController.getMoment);
router.delete("/deleteMoment", momentController.deleteMoment);
router.put("/updateMoment", momentController.updateMoment);

module.exports = router;
