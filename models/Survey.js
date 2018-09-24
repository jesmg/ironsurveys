const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const surveySchema = new Schema({
  question: String,
  response: Number,
  // uniqueResponse: String,
  // reward_points: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
