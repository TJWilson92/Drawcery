var mongoose = require('mongoose');
var UserSchema = mongoose.model('User').schema;

var QuestionSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  anonymous: Boolean,
  email: String,
  askedBy: UserSchema,
  questionText: String,
  marksAvailable: Number,
  explanationText: String,
  molecule: String,
  molecule_jme: String,
  answerMolecule: String,
  answerMolecule_jme: String
});

var Question = module.exports = mongoose.model('Question', QuestionSchema);
