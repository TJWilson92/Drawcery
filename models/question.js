var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
  questionText: String,
  molecule: String,
  answerMolecule: String
});

var Question = module.exports = mongoose.model('Question', QuestionSchema);
