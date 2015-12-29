var express = require('express');
var router = express.Router();

var Question = require('../models/question.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    Question.find({'askedBy._id': req.user._id}).sort({'date': 'desc'}).exec(function (err, questions) {
      res.render('Home/EducatorHome', {
        title: 'Drawcery | Home',
        user: req.user,
        questions: questions,
        base_protocol: req.protocol,
        base_url: req.get('host')
      });
    });

  } else {
    res.render('Home/Home', {
      title: 'Drawcery'
    });
  }

});

router.get('/login', function (req, res, next) {
  res.render('Home/login', {
    title: "Drawcery | Login"
  });
});

router.get('/registerTeacher', function (req, res, next) {
  console.log(req.body);
  res.render('Home/RegisterTeacher', {
    title: 'Drawcery | New Teacher'
  });
});

router.get('/register', function (req, res, next) {
  res.render('Home/Register', {
    title: 'Drawcery | Register'
  });
});

module.exports = router;
