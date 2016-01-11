var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var nodemailer = require('nodemailer');
var expressValidator = require('express-validator');
var email_details = require('./email_details');

var mongoose_url = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/drawcery';

mongoose.connect(mongoose_url, function () {
  console.log('connected to mongoose');
});

var User = require('./models/user.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var routes = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var answers = require('./routes/answers');
var feedbacks = require('./routes/feedbacks');
var groups = require('./routes/groups');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "not-keyboard-cat",
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 0.5 * 24 * 60 * 60 // = 0.5 days
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/questions', questions);
app.use('/answers', answers);
app.use('/feedback', feedbacks);
app.use('/groups', groups);

var transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  tls: {ciphers: 'SSLv3'},
  secureConnection: false,
  auth: {
    user: email_details.address,
    pass: email_details.password
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
