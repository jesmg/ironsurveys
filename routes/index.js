const express = require('express');
const { ensureLoggedIn, hasRole } = require('../middleware/ensureLogin');
const router  = express.Router();
const Survey = require('../models/Question');
const Users = require('../models/User');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/designer_dashboard', [
  ensureLoggedIn('auth/login'),
  hasRole()
], (req, res) =>{
  Promise.all([
    Survey.find(),
    Users.find()
  ])
  .then(([surveys, users]) => {
    res.render('dashboards/designer_dashboard', {surveys, users})
  }, err => console.log(err));
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
  const question = req.body.question
  let user = req.body.users_select
  if(!Array.isArray(user)){
    user=[user]
  }

  const newSurvey = new Survey({
    question,
    access: user,
    response: {}
  })
  newSurvey.save()
  .then((survey)=> {
    res.redirect("/designer_dashboard");
  })
})





// Añadir redirect error
// Añadir render con login


module.exports = router;
