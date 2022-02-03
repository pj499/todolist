const express= require('express');
const router= express.Router();
const homeController= require('../controllers/home_controller');

console.log("Router loaded!");

//router.get('/', homeController.home);
router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/user/task')
    } else {
      res.render('home')
    }
    return next()
  }, homeController.home);
  
router.use('/user',require('./user'));









module.exports= router;