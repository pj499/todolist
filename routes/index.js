const express= require('express');
const router= express.Router();
const homeController= require('../controllers/home_controller');
const userController = require('../controllers/users_controller');

console.log("Router loaded!");

//router.get('/', homeController.home);
router.get('/', userController.tasks);
  
router.use('/user',require('./user'));









module.exports= router;