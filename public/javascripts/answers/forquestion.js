// Functions to deal with collecting and drawing all of the unique structures given by students.
var problem_molecule = document.getElementById("problem-molecule").innerHTML;
var answer_molecule = document.getElementById("answer-molecule").innerHTML;

var uniqueValues = document.getElementById('stringified_uniqueValues').innerHTML;
uniqueValues = JSON.parse(uniqueValues);

function draw_unique_structures(uniqueValues) {
  for (var v = 0; v < uniqueValues.length; v++) {
    var ob = uniqueValues[v];
    var temp_applet  = new JSApplet.JSME("jsme_container_" + ob.ids[0], '400px', '400px');
    temp_applet.readMolecule(ob.val_jme);
  }
}

// Functions for sending off AJAX to create generic feedback for structure
// Need to send an object off with these properties:
// {AnswerIds, isForSpecificAnswer: , Question, FeedbackText, Mark}

function createGenericFeedback(structure_val, question) {
  console.log('createGenericFeedback');
  var answerIds = document.getElementById(structure_val + "_AnswerIds").value;
  answerIds = answerIds.split(',');

  var isForSpecificAnswer = false;
  var feedbackText = document.getElementById(structure_val + "_feedback").value;
  var mark = document.getElementById(structure_val + "_marksAwarded").value;

  var feedbackBoxId = "#" + structure_val + "_feedback";
  var markAwardedId = "#" + structure_val + "_marksAwarded";

  question = JSON.stringify(question);

  var ajax_data = ({
    AnswerIds: answerIds,
    isForSpecificAnswer: isForSpecificAnswer,
    Question: question,
    FeedbackText: feedbackText,
    Mark: mark
  });
  console.log(ajax_data);

  $.ajax({
    url: '/feedback/genericForQuestion',
    dataType: "json",
    type: 'POST',
    data: ajax_data
  }).done(function (msg) {
    console.log(msg);
    $(feedbackBoxId.toString()).slideToggle("slow", function () {
      $(markAwardedId).slideToggle('slow', function () {

      });
    });
  });

}

function jsmeOnLoad() {

  problem_applet = new JSApplet.JSME("jsme_problem", "500px", "500px", {
    "options": "oldlook, star"
  });

  answer_applet = new JSApplet.JSME("jsme_solution", "500px", "500px", {
    "options": "oldlook, star"
  });


  problem_applet.readMolecule(problem_molecule);
  answer_applet.readMolecule(answer_molecule);

  draw_unique_structures(uniqueValues);
}
