var mongoose = require('mongoose');
var QuestionSchema = mongoose.model('Question').schema;
var MoleculeSchema = mongoose.model('Molecule').schema;

var AnswerSchema = mongoose.Schema({
  question: [QuestionSchema],
  molecule: [MoleculeSchema]
});

var Answer = module.exports = mongoose.model('Answer', AnswerSchema);
