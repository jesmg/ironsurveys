const express = require('express');
const { ensureLoggedIn, hasRole } = require('../middleware/ensureLogin');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/designer_dashboard', [
  ensureLoggedIn('auth/login'),
  hasRole('Designer')
], (req, res) =>{
  res.render('dashboards/designer_dashboard')
})

// Añadir redirect error
// Añadir render con login
router.get('/user_dashboard', [
  ensureLoggedIn('auth/login'),
  hasRole('User')
], (req, res) =>{
  res.render('dashboards/user_dashboard')
})

router.post("/designer_dashboard", (req, res, next) =>{
  const question = req.body.question
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
