const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const surveySchema = new Schema({
    title: String,
    questions: [{}],
    access: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
