var mongoose = require('mongoose');
var QuestionSchema = mongoose.model('Question').schema;
var MoleculeSchema = mongoose.model('Molecule').schema;
var UserSchema = mongoose.model('User').schema;

var AnswerSchema = mongoose.Schema({
  answeredBy: UserSchema,
  answerText: String,
  reflectiveResponse: String,
  anonymous: Boolean,
  email: String,
  time: {type: Date, default: Date.now},
  question: QuestionSchema,
  molecule: [MoleculeSchema],
  feedback: [mongoose.Schema.ObjectId]
});

var Answer = module.exports = mongoose.model('Answer', AnswerSchema);
