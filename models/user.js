var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
  email: String,
  firstname: String,
  surname: String,
  isEducator: Boolean
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

var User = module.exports = mongoose.model('User', userSchema);
