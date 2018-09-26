const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  response: [{
    user: {type:Schema.Types.ObjectId, ref:'User'},
    value: Number
  }],
  surveyID: {type:Schema.Types.ObjectId, ref:'Survey'}
  
  // uniqueResponse: String,
  // reward_points: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
