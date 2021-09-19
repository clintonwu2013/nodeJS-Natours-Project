const express = require("express");

const router = express.Router();
const tourController = require("./../controllers/tourController");

router
  .route("/top-5-cheap")
  .get(tourController.aliaseTopTours, tourController.getAllTours);
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.modifyTour)
  .delete(tourController.deleteTour);

module.exports = router;
