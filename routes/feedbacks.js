var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Question = require('../models/question');
var Answer = require('../models/answer');
var Feedback = require('../models/feedback');

function makeSafeUser(user) {
  var safeUser;
  if (user === undefined) {
    safeUser = undefined;
  } else {
    safeUser = new User({
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      _id: user._id
    });
  }
  return(safeUser);
}

router.post('/new', function (req, res, next) {
  var safeUser = makeSafeUser(req.user);
  var isForSpecificAnswer = req.body.isForSpecificAnswer === "true";
  var question = req.body.question_id;
  var answer = req.body.answer_id;
  var mark = req.body.mark;
  var feedbackText = req.body.feedbackText;

  Question.findById(question).exec(function (err, q) {
    Answer.findById(answer).exec(function (err, a) {
      var newFeedback = new Feedback({
        anonymous: req.user === undefined,
        selfAssessment: false,
        providedBy: safeUser || undefined,
        isForSpecificAnswer: isForSpecificAnswer,
        question: q,
        answer: a,
        mark: mark,
        feedbackText: feedbackText
      });

      newFeedback.save(function (err, saved_feedback) {
        if (err) throw err;
        a.feedback.push(saved_feedback._id);
        a.save(function (err, a) {
            res.redirect('/answers/show/' + answer, {
              user: req.user,
              title: "Drawcery | Answer"
            });
        });
      });
    });
  });


});

// This function creates a feedback item for ever answer which gave a set response to a question
// It comes from answers/forquestion and comes as an AJAX call
router.post('/genericForQuestion', function (req, res, next) {
  var safeUser = makeSafeUser(req.user);
  var answer_ids = req.body.AnswerIds.split(',');
  var feedbackText = req.body.FeedbackText;
  var mark = req.body.mark;

  Question.findById(req.body.question_id).exec(function (err, question) {
    answer_ids.forEach(function (ans_id, ind, arr) {
      Answer.findById(ans_id).exec(function (err, ans) {
        if (err) throw err;

        var feedback = new Feedback({
          selfAssessment: false,
          anonymouse: false,
          providedBy: safeUser,
          isForSpecificAnswer: false,
          question: question,
          answer: ans,
          feedbackText: feedbackText,
          mark: Number(mark)
        });

        feedback.save(function (err, f) {
          ans.feedback.push(f._id);
          ans.save(function (err, a) {
            if (ind == (arr.length - 1)) {
              res.redirect('/answers/forQuestion/' + question._id, 301, {
                user: req.user,
                title: 'Drawcery | Answers'
              });
            }
          });
        });
      });
    });
  });




});

router.post('/newselfassessment', function (req, res, next) {
  var safeUser = makeSafeUser(req.user);
  var mark = req.body.mark;
  var feedbackText = req.body.feedbackText;
  Answer.findById(req.body.answer_id).exec(function (err, a) {
    if (err) throw err;
    Question.findById(a.question._id).exec(function (err, q) {
      if (err) throw err;
      var newFeedback = new Feedback({
        anonymous: false,
        selfAssessment: true,
        providedBy: safeUser || undefined,
        isForSpecificAnswer: true,
        question: q,
        answer: a,
        mark: mark,
        feedbackText: feedbackText
      });
      newFeedback.save(function (err, f) {
        if (err) throw err;
        a.feedback.push(f._id);
        a.save(function (err, a) {
          res.redirect('/answers/show/' + a._id, {
            user: req.user,
            title: "Drawcery | Answer"
          });
        });
      });
    });
  });
});

router.post('/createReply', function (req, res, next) {
  if (req.user) {
    var safeUser = makeSafeUser(req.user);
    var reply = new Object({
      text: req.body.replyText,
      user: safeUser,
      date: Date.now()
    });
    console.log(reply);
    Feedback.findById(req.body.feedback_id).exec(function (err, feedback) {
      feedback.replies.push(reply);
      feedback.save(function (err, f) {
        if (err) throw err;
        res.redirect('back');
      });
    });
  } else {
    res.redirect('back');
  }
});

module.exports = router;
