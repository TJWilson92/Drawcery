var mongoose = require('mongoose');
var UserSchema = mongoose.model('User').schema;
var QuestionSchema = mongoose.model('Question').schema;

var GroupSchema = mongoose.Schema({
  name: String,
  about: String,
  ownedBy: UserSchema,
  members: [UserSchema],
  questions: [QuestionSchema],
  notifications: [{
    title: String,
    text: String,
    date: {type: Date, default: Date.now()},
  }]
});

var Group = module.exports = mongoose.model('Group', GroupSchema);
