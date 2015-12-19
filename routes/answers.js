var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Molecule = require('../models/molecule.js');
var Answer = require('../models/answer.js');
var Question = require('../models/question.js');

// TODO: This only works with embedded documents, and assumes two levels of embedding -
// Make this more flexible

//  Functions to get unique values from json arrays
// Essentially we want back: {val: String, count: Int, ids: Array}
// json_array is the array of json docs
// ind is the index we want - can be integer or string
// ind is an [array] because of embedded documents
function getUniqueStructures(json_array, ind) {
  var results = [];

  // For each item in the json_array
  for (var i = 0; i < json_array.length; i++) {
    // This is the value that we're concerned with
    var thisValue = json_array[i][ind[0]][0][ind[1]];
    // Check to see if thisValue is already present in our results
    var alreadyPresent = isElementAlreadyPresent(json_array[i], ind, results);
    if (alreadyPresent) {
      //  Do nothing because it's already been sorted
    } else {
      // This means that the element is not yet detailed
      // filteredResults will be an array of javascript objects where the value is met\\
      var filteredResults = getFilterOfValue(json_array, ind, thisValue);
      // Begin to process these to be put in the results array
      var structure_jme = get_jme_format(filteredResults);
      var ids = [];
      for (var a  = 0; a < filteredResults.length; a ++) {
        id_string = filteredResults[a]._id.toString();
        ids.push(id_string);
      }

      var temp_results = {
        val: thisValue,
        val_jme: structure_jme,
        count: filteredResults.length,
        ids: ids
      };

      results.push(temp_results);

    }
  }
  return(results);
}

//  Take single element in json array and place it into results
// element is the json object, e.g. json_array[0]
// field is the field in the object
// results is the array of results
function isElementAlreadyPresent(json_element, field, results) {
    var alreadyPresent = results.some(function (ele, ind, arr) {
      return ele.val === json_element[field[0]][0][field[1]];
    });
    return alreadyPresent;
}

// Return an array of all json elements in the json_array where the value matches that we're looking for
// json_array is the data
// field is the field we're looking in
// and val is the value we're looking for
function getFilterOfValue(json_array, field, val) {
  var results = json_array.filter(function (array_val) {
    return array_val[field[0]][0][field[1]] === val;
  });
  return results;
}

// Function to get the jme file format using the SMILES format already get_jme_format
// Note that SMILES format is named 'val' elsewhere
function get_jme_format(filteredResults) {
  var first_entry = filteredResults[0];
  var jme_structure = first_entry.molecule[0].structure_jme;
  return(jme_structure);
}

router.post('/new', function (req, res, next) {
  var questionId = req.body.QuestionId;
  var answerText = req.body.AnswerText;
  var answerMolecule_smiles = req.body.AnswerMolecule_smiles;
  var answerMolecule_jme = req.body.AnswerMolecule_jme;
  var editHistory = req.body.EditHistory;

  Question.findById(questionId).exec(function (err, q) {
    if (err) throw err;

    var m = new Molecule({
      structure: answerMolecule_smiles,
      structure_jme: answerMolecule_jme,
      editHistory: JSON.parse(editHistory)
    });

    var a = new Answer({
      question: q,
      molecule: m
    });

    m.save(function (err, mol) {
      if (err) throw err;
      a.save(function (err, ans) {
        if (err) throw err;
        res.redirect(301, '/');
      });
    });
  });
});

router.get('/forquestion/:question_id', function (req, res, next) {
  var question_id = req.params.question_id;
  Answer.find({'question._id': question_id}).exec(function (err, Ans) {
    if (err) throw err;
    if (Ans.length === 0) {
      Question.findById(question_id).exec(function (err, q) {
        if (err) throw err;
        res.render('Answer/showforquestion', {
          question: q,
          answers: Ans
        });
      });
    } else {
      var question = (Ans[0].question[0]);
      var uniqueValues = getUniqueStructures(Ans, ['molecule', 'structure']);
      res.render('Answer/showforquestion', {
        answers: Ans,
        question: question,
        uniqueValues: uniqueValues,
        stringified_uniqueValues: JSON.stringify(uniqueValues)
      });
    }
  });
});

module.exports = router;
