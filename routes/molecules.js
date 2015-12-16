var express = require('express');
var router = express.Router();
var Molecule = require('../models/molecule.js');

router.get('/show/:id', function (req, res, next) {
  Molecule.findById(req.params.id).exec(function (err, mol) {
    res.render('Molecule/show.jade')
  })
});

router.post('/new')

router.post('/new')
