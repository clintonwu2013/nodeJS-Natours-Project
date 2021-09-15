const express = require("express");

const router = express.Router();
const tourController = require("./../controllers/tourController");

router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkNameAndPrice, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.modifyTour)
  .delete(tourController.deleteTour);

module.exports = router;
