const express=require('express');
const passport = require('passport');
const router=express.Router();
const userController=require('../controllers/users_controller');

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/'}),userController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email','https://www.googleapis.com/auth/user.phonenumbers.read']}));//scope defines what information we want from google
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),userController.createSession);
router.get('/task',passport.checkAuthentication,userController.tasks);


module.exports=router;