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
    console.log(survey._id)
    res.render('dashboards/surveys', {survey})
  })
  .catch(err => {
    console.log(err)
  })
})

//  Survey answers 
router.post("/surveys/:id", (req, res, next) => {
  
  const check = req.body.check;
  let params = req.params.id;
  const responseId = req.params.id


  Survey.findByIdAndUpdate(params, {$push: {responses: check}} ,{new:true})
  .then( survey => {
    console.log(survey)
    res.redirect(`/surveys/` + responseId)
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
  //let question = req.body.question
  console.log("entra")

  const newSurvey = new Survey({
    title: surveyName,
   //questions: [question],
    access: user,
    responses: []
  })
  newSurvey.save()
  .then(survey=> {
    console.log(survey)
    res.redirect("/designer_dashboard");
  })

})
router.post("/designer_dashboard/:surveyId", (req, res, next) =>{
  console.log("entra <------------------------------");
  const questionId = req.body.params
  const question = req.body.question
  const surveyId = req.params.surveyId

  Survey.findByIdAndUpdate(surveyId, {$push: {questions: question}}, {new:true})
  .then( question =>{
    console.log(question)
    res.redirect("/designer_dashboard/" + surveyId)
  })
  .catch((err) => console.log(err))

})

// Unique survey
router.get("/designer_dashboard/:surveyId", (req,res, next) => {
  const surveyId = req.params.surveyId;
  Survey.findById(surveyId)
  .then(survey => {
    const id = survey._id
    const title = survey.title
    console.log(id)
    res.render("dashboards/survey-detail", {id, title});
 }).catch((err) => console.log(err))
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