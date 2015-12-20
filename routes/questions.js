var express = require('express');
var router = express.Router();

var Question = require('../models/question.js');
var Molecule = require('../models/molecule.js');

router.get('/show/:id', function (req, res, next) {
  Question.findById(req.params.id).exec(function (err, qs) {
    if (err) throw err;
    res.render('Question/show', {
      question: qs
    });
  });
});

router.get('/new', function (req, res, next) {
  res.render('Question/new');
});

router.post('/new', function (req, res, next) {
  var q = new Question({
    questionText: req.body.QuestionText,
    explanationText: req.body.explanationText,
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

module.exports = router;
