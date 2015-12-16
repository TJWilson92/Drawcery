var mongoose = require('mongoose');

var MoleculeSchema = mongoose.Schema({
  structure: String,
  editHistory: Array
});
