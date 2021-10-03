const express = require("express");

const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/restPassword/:token", authController.resetPassword);
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.creatUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.modifyUser)
  .delete(userController.deleteUser);

module.exports = router;
