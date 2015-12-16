var express = require('express');
var router = express.Router();

var Question = require('../models/question.js');
var Molecule = require('../models/molecule.js');

router.get('/show/:id', function (req, res, next) {
  Question.findById(req.params.id).exec(function (err, qs) {
    res.render('Question/show', {
      question: qs
    })
  })
})

router.get('/new', function (req, res, next) {
  res.render('Question/new');
})

router.post('/new', function (req, res, next) {

  q = new Question({

  })
})

module.exports = router;
