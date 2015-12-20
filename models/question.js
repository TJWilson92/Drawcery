var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
  questionText: String,
  explanationText: String,
  molecule: String,
  molecule_jme: String,
  answerMolecule: String,
  answerMolecule_jme: String
});

var Question = module.exports = mongoose.model('Question', QuestionSchema);
