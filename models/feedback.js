var mongoose = require('mongoose');
var AnswerSchema = mongoose.model('Answer').schema;
var QuestionSchema = mongoose.model('Question').schema;

// Feedback is any formative assessment provided by an educator for any Answer
// or set of answers with a specific structure
// isForSpecificAnswer distinguishes between those given for structure and those for specific answer
var FeedbackSchema = mongoose.Schema({
  isForSpecificAnswer: Boolean,
  question: QuestionSchema,
  answer: AnswerSchema,
  feedbackText: String,
  mark: Number
});

var Answer = module.exports = mongoose.model('Answer', AnswerSchema);
