const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/users_controller");
const taskController = require("../controllers/task_controller");

router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  userController.createSession
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); //scope defines what information we want from google
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  userController.createSession
);
router.get("/task", passport.checkAuthentication, userController.tasks);
router.get("/sign-out", userController.destroySession);
router.post("/verify/:id", userController.verifyEmailPath);
router.get("/verifyOTP/:id", userController.renderOTP);
router.post("/resendOtp/", userController.resendOtp);
router.get("/verifyOTP", userController.refreshOTP);
router.post("/addTask", taskController.addTask);
router.get("/deleteTask/:id", taskController.deleteTask);
router.get(
  "/profile",
  passport.checkAuthentication,
  taskController.profilePage
);
router.post("/update-password", userController.updatePassword);
router.post("/update-profile-picture",userController.uploadProfile);

module.exports = router;
