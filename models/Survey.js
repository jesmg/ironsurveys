const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const surveySchema = new Schema({
  question: String,
  question: [],
  response: []

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;



/* 
formulario para crear las respuestas


*/