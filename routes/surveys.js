const express = require('express');
const {hasRole} = require('../middleware/ensureLogin');
const router = express.Router();

router.get("/",
  hasRole(undefined, 'Designer'),
  (req, res, next) => {
    res.render("dashboards/surveys")
  })



  

  // hacer npm install chart.js --save

// coger datos de survey y ponerlos en el gráfico
/*

let ctx = document.getElementById("chart").getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels [meter un bucle for que itere entre lo que tenemos en datos] response.user[]
    datasets: [{
      label: '',
      data: [meter un bucle for que itere entre lo que tenemos a la vez que itera en labels response.data[] ]]
    }]
  },
})
*/





  
module.exports = router;