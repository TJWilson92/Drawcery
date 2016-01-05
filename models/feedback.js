var mongoose = require('mongoose');
var AnswerSchema = mongoose.model('Answer').schema;
var QuestionSchema = mongoose.model('Question').schema;
var UserSchema = mongoose.model('User').schema;

// Feedback is any formative assessment provided by an educator for any Answer
// or set of answers with a specific structure
// isForSpecificAnswer distinguishes between those given for structure and those for specific answer
var FeedbackSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  anonymous: Boolean,
  selfAssessment: Boolean,
  providedBy: UserSchema,
  isForSpecificAnswer: Boolean,
  question: QuestionSchema,
  answer: AnswerSchema,
  feedbackText: String,
  mark: Number,
  replies: [{
    text: String,
    user: UserSchema,
    date: {type: Date, default: Date.now}
  }]
});

var Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);
