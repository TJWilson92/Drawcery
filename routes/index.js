var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('Home/EducatorHome', {
      title: 'Drawcery | Educator',
      user: req.user
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
