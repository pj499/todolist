const express=require('express');
const passport = require('passport');
const router=express.Router();
const userController=require('../controllers/users_controller');

router.get('/verify',userController.renderOtp);
router.post('/verify',userController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/'}),userController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));//scope defines what information we want from google
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),userController.createSession);
router.get('/task',passport.checkAuthentication,userController.tasks);
router.get('/sign-out', userController.destroySession);
router.post('/verify/:id', userController.verifyEmail);


module.exports=router;