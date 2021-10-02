const express = require("express");

const router = express.Router();
const tourController = require("./../controllers/tourController");
const authController = require("./../controllers/authController");

router.route("/get-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);
router
  .route("/top-5-cheap")
  .get(tourController.aliaseTopTours, tourController.getAllTours);
router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.modifyTour)
  .delete(tourController.deleteTour);

module.exports = router;
