var mongoose = require('mongoose');

var MoleculeSchema = mongoose.Schema({
  structure: String,
  editHistory: Array
});

var Molecule = module.exports = mongoose.model('Molecule', MoleculeSchema);
