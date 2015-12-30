var mongoose = require('mongoose');
var UserSchema = mongoose.model('User').schema;

var GroupSchema = mongoose.Schema({
  name: String,
  ownedBy: UserSchema,
  members: [UserSchema]
});

var Group = module.exports = mongoose.model('Group', GroupSchema);
