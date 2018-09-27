const express = require('express');
const {hasRole} = require('../middleware/ensureLogin');
const router = express.Router();
const Survey = require('../models/Survey');
const Users = require('../models/User');

router.get("/",
  hasRole(undefined, 'Designer'),
  (req, res, next) => {
    res.render("dashboards/surveys")
  })

/* Esto lleva a las rutas de los resultados de cada encuesta */

  router.get("/results/:id", (req, res, next) => {
    let surveyId = req.params.id;
    Survey.findById(surveyId)
    .then(survey =>{
      let responses = JSON.stringify(survey.responses)
      let questions = JSON.parse(JSON.stringify(survey.questions))
      console.log("esto son las responses --------------------" + responses)
      console.log("esto son las questions --------------------" + questions)
      res.render('dashboards/results', {survey, responses, questions})
    })
    .catch(err => {
      console.log(err)
    })
  })
  
module.exports = router;