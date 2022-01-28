const express=require('express');
const passport = require('passport');
const router=express.Router();
const userController=require('../controllers/users_controller');

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/'}),userController.createSession);

router.get('/task',passport.checkAuthentication,userController.tasks);


module.exports=router;