const express = require('express');
const { ensureLoggedIn, hasRole } = require('../middleware/ensureLogin');
const router  = express.Router();
const Survey = require('../models/Survey');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/designer_dashboard', [
  ensureLoggedIn('auth/login'),
  hasRole()
], (req, res) =>{
  Survey.find()
  .then(surveys => {
    res.render('dashboards/designer_dashboard', {surveys})
  })
  .catch( err => console.log(err));
})

router.get('/user_dashboard', [
  ensureLoggedIn('auth/login'),
  hasRole(undefined ,'User')
], (req, res) =>{
  Survey.find()
  .then(surveys => {
    res.render('dashboards/user_dashboard', {surveys})
  })
  .catch( err => console.log(err));

})

// Create new survey
router.post("/designer_dashboard", (req, res, next) =>{
  console.log("entra en post")
  const question = req.body.question
  const newSurvey = new Survey({
    question
  })
  newSurvey.save()
  .then((survey)=> {
    console.log("survey created")
    res.redirect("/designer_dashboard");
  })

})
// Añadir redirect error
// Añadir render con login




module.exports = router;