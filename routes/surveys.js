const express = require('express');
const {
  hasRole
} = require('../middleware/ensureLogin');
const router = express.Router();

router.get("/",
  hasRole(),
  (req, res, next) => {
    res.render("dashboards/surveys")
  })

  //post new survey

  router.post("/", (req, res, next) =>{
    const question = req.body.question
    const response = req.body.response
    const newSurvey = new Survey({
      question, 
      response
    })
    newSurvey.save((err) =>{
      if(err){
        res.render("survey")
      }
    })
  })




module.exports = router;