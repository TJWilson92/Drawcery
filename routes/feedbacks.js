var express = require('express');
var router = express.Router();
var Answer = require('../models/answer');
var Feedback = require('../models/feedback');

// This function creates a feedback item for ever answer which gave a set response to a question
// It comes from answers/forquestion and comes as an AJAX call
router.post('/genericForQuestion', function (req, res, next) {
  var answer_ids = req.body.AnswerIds;
  var isForSpecificAnswer = req.body.isForSpecificAnswer;
  var question = req.body.Question;
  var feedbackText = req.body.FeedbackText;
  var mark = req.body.Mark;

  answer_ids.forEach(function (ans_id, ind, arr) {
    Answer.findById(ans_id).exec(function (err, ans) {
      if (err) throw err;
        var feedback = new Feedback({
          isForSpecificAnswer: isForSpecificAnswer,
          question: question,
          answer: ans,
          feedbackText: feedbackText,
          mark: mark
        });
    });
  });
  res.send('Complete');
});

// create new feedback object
router.post('/new', function (req, res, next) {

});

module.exports = router;
