var mongoose = require('mongoose');

var MoleculeSchema = mongoose.Schema({
  structure: String,
  structure_jme: String,
  editHistory: Array
});

var Molecule = module.exports = mongoose.model('Molecule', MoleculeSchema);
