document.addEventListener('DOMContentLoaded', () => {

// coger datos de survey y ponerlos en el gráfico
const responses = window.responses;
const questions = window.questions;
let ctx = document.getElementById("resultChart").getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: questions,
    datasets: [{
      label: '',
      data: responses,
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
    }]
  },
});

}, false);
