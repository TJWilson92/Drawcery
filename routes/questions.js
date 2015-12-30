var express = require('express');
var router = express.Router();

var Question = require('../models/question.js');
var Molecule = require('../models/molecule.js');
var User = require('../models/user.js');
// comment
router.get('/show/:id', function (req, res, next) {
  Question.findById(req.params.id).exec(function (err, qs) {
    if (err) throw err;
    if (qs) {
      res.render('Question/show', {
        question: qs
      });
    } else {
      res.redirect('/', 301);
    }

  });
});

router.get('/new', function (req, res, next) {
  if (req.user) {
    res.render('Question/new');
  } else {
    res.render('Question/newAnon');
  }
});

router.get('/editQ/:id', function (req, res, next) {
  Question.findById(req.params.id).exec(function (err, question) {
    if (err) throw err;
    if (question) {
      res.render('Question/edit', {
        question: question,
        title: 'Drawcery | Edit Question'
      });
    } else {
      res.redirect('/', 301);
    }
  });
});

router.post('/newAnon', function (req, res, next) {
  var q = new Question({
    anonymous: true,
    email: req.body.email,
    questionText: req.body.QuestionText,
    explanationText: req.body.explanationText,
    marksAvailable: req.body.MarksAvailable,
    molecule: req.body.QuestionMolecule,
    molecule_jme: req.body.QuestionMolecule_jme,
    answerMolecule: req.body.AnswerMolecule,
    answerMolecule_jme: req.body.AnswerMolecule_jme
  });

  q.save(function (err) {
    if (err) throw err;
    res.redirect(301, '../questions/show/' + q._id);
  });
});

router.post('/new', function (req, res, next) {
  var constrainedUser = new User({
    _id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname,
    surname: req.user.surname,
    isEducator: req.user.isEducator
  });
  var q = new Question({
    anonymous: false,
    askedBy: req.user,
    questionText: req.body.QuestionText,
    explanationText: req.body.explanationText,
    marksAvailable: req.body.MarksAvailable,
    molecule: req.body.QuestionMolecule,
    molecule_jme: req.body.QuestionMolecule_jme,
    answerMolecule: req.body.AnswerMolecule,
    answerMolecule_jme: req.body.AnswerMolecule_jme
  });

  q.save(function (err) {
    if (err) throw err;
    res.redirect(301, '../questions/show/' + q._id);
  });
});

router.post('/editQ', function (req, res, next) {
  Question.findById(req.body.question_id).exec(function (err, q) {
    q.questionText = req.body.QuestionText;
    q.explanationText = req.body.explanationText;
    q.marksAvailable = req.body.MarksAvailable;
    q.molecule = req.body.QuestionMolecule;
    q.molecule_jme = req.body.QuestionMolecule_jme;
    q.answerMolecule = req.body.AnswerMolecule;
    q.answerMolecule_jme = req.body.AnswerMolecule_jme;

    q.save(function (err, q) {
      res.redirect('/');
    });
  });
});

router.post('/delete', function (req, res, next) {
  Question.findById(req.body.question_id).exec(function (err, q) {
    if (err) throw err;
    var user_id = req.user._id;
    var owner = user_id.equals(q.askedBy._id);
    if (owner) {
      q.remove(function (err) {
        res.redirect('/', 301);
      });
    } else {
      res.redirect('/', 301);
    }
  });
});

module.exports = router;
