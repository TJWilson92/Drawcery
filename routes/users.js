var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

function isValidPassword(password1, password2) {
  var results = new Object({
    validPassword: false,
    errorMessages: []
  });

  if (password1.length < 5) {
    results.errorMessages.push('Password has < 5 characters');
  }

  if (password1 != password2) {
    results.errorMessages.push('Passwords do not match');
  }

  if (results.errorMessages.length === 0) {
    results.validPassword = true;
  }
  return results;
}

function isValidEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function doValidationChecks(email, password1, password2) {
  var results = new Object ({
    isValid: false,
    errors: []
  });

  var validEmail = isValidEmail(email);
  var validPassword = isValidPassword(password1, password2);
  console.log(validPassword);

  if (!validEmail || !validPassword.validPassword) {

    var errorMessages = [];
    errorMessages.push(validPassword.errorMessages);

    if (!validEmail) {
      errorMessages.push('Invalid e-mail address');
    }

    results.errors = errorMessages;
  } else {
    results.isValid = true;
  }
  return results;
}

router.post('/newEducator', function (req, res, next) {
  var validationResults = doValidationChecks(req.body.email, req.body.password1, req.body.password2);
  console.log(validationResults);
  if (!validationResults.isValid) {
    res.render('Home/RegisterTeacher', {
      errorMessage: validationResults.errors
    });
  } else {
    var newUser = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      surname: req.body.surname,
      isEducator: true
    });

    User.register(newUser, req.body.password1, function (err) {
      if (err) throw err;
      res.redirect('/', 301, {
        user: newUser
      });
    });
  }
});

router.post('/newStudent', function (req, res, next) {
  var validationResults = doValidationChecks(req.body.email, req.body.password1, req.body.password2);
  console.log(validationResults);

  if (!validationResults.isValid) {
    res.redirect('/registerTeacher', 301, {
      errorMessage: validationResults.errors
    });
  } else {
    var newUser = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      surname: req.body.surname,
      isEducator: false
    });

    User.register(newUser, req.body.password1, function (err) {
      if (err) throw err;
      res.redirect('/', 301, {
        user: newUser
      });
    });
  }
});

router.post('/login', passport.authenticate('local'), function (req, res, next) {
  res.redirect('/');
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
