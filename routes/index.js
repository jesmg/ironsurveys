const express = require('express');
const { ensureLoggedIn, hasRole } = require('../middleware/ensureLogin');
const router  = express.Router();
const Survey = require('../models/Survey');
const Users = require('../models/User');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

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
router.get("/surveys/:id", (req, res, next) => {
  let surveyId = req.params.id;
  Survey.findById(surveyId)
  .then(survey =>{
    res.render('dashboards/surveys', {survey})
  })
  .catch(err => {
    console.log(err)
  })
})

//  Select value 
router.post("/surveys/:id", (req, res, next) => {
  
  const check = req.body.check;
  let params = req.params.id;

  Survey.findByIdAndUpdate(params, {$push: {responses: check}} ,{new:true})
  .then( survey => {
    res.render("dashboards/user_dashboard", survey)
  }).catch((err) => {
    console.log(err)})

})

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

// Create new survey
router.post("/designer_dashboard", (req, res, next) =>{
  const surveyName = req.body.surveyName
  let user = req.body.users_select
  if(!Array.isArray(user)){
    user=[user]
  }
  const newSurvey = new Survey({
    title: surveyName,
    access: user,
    responses: []
  })
  newSurvey.save()
  .then((survey)=> {
    res.redirect("/designer_dashboard");
  })

})

// Unique survey
router.get("/designer_dashboard/:surveyId", (req,res, next) => {
  const surveyId = req.params.surveyId;
  Survey.findById(surveyId)
  .then(survey => {
    const id = survey._id
    res.render("dashboards/survey-detail", {id});
 })
})

// create question
router.post("/designer_dashboard/:surveyId", (req, res, next) =>{
  const questionId = req.body.params
  const question = req.body.question
  const surveyId = req.params.surveyId

  Survey.findByIdAndUpdate(surveyId, {$push: {questions: question}}, {new:true})
  .then( question =>{
    res.redirect("/designer_dashboard/" + surveyId)
  })
  .catch((err) => console.log(err))
})



module.exports = router;