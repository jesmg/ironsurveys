const express = require('express');
const {
  hasRole
} = require('../middleware/ensureLogin');
const router = express.Router();

router.get("/",
  hasRole(undefined, 'Designer'),
  (req, res, next) => {
    res.render("dashboards/surveys")
  })


  
module.exports = router;