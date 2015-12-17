var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Molecule = require('../models/molecule.js');
var Answer = require('../models/answer.js');
var Question = require('../models/question.js');

router.post('/new', function (req, res, next) {
  var questionId = req.body.QuestionId;
  var answerText = req.body.AnswerText;
  var answerMolecule_smiles = req.body.AnswerMolecule_smiles;
  var answerMolecule_jme = req.body.AnswerMolecule_jme;
  var editHistory = req.body.EditHistory;

  Question.findById(questionId).exec(function (err, q) {
    if (err) throw err;

    var m = new Molecule({
      structure: answerMolecule_smiles,
      structure_jme: answerMolecule_jme,
      editHistory: JSON.parse(editHistory)
    });

    var a = new Answer({
      question: q,
      molecule: m
    });

    m.save(function (err, mol) {
      if (err) throw err;
      a.save(function (err, ans) {
        if (err) throw err;
        res.redirect(301, '/');
      });
    });
  });
});

router.get('/forquestion/:question_id', function (req, res, next) {
  Answer.find({'question._id': req.params.question_id}).exec(function (err, Ans) {
    if (err) throw err;
    var question = (Ans[0].question[0]);
    console.log(question);
    res.render('Answer/showforquestion', {
      answers: Ans,
      question: question
    });
  });
});

module.exports = router;
