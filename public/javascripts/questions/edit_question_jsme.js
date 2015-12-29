$('#donotdelete').hide(function () {});
$('#deleteConfirm').hide(function () {});

$('#deleteButton').click(function () {
  $('#donotdelete').slideToggle('slow', function () {});
  $('#deleteConfirm').slideToggle('slow', function () {});
});

$('#donotdelete').click(function () {
  $('#donotdelete').slideToggle('slow', function () {
  });

  $('#deleteConfirm').slideToggle('slow', function () {
  });
});

function jsmeOnLoad() {

    jsmeApplet = new JSApplet.JSME("jsme_container", "500px", "500px", {
      "options": "oldlook, star"
    });

    function takeStructure(field_id, field_jme, pressed_button) {
      var formula = jsmeApplet.smiles();
      var jme = jsmeApplet.jmeFile();
      if (formula === "") {
        alert("No structure drawn");
      } else {
        document.getElementById(field_id).value = formula;
        document.getElementById(field_jme).value = jme;
        document.getElementById(pressed_button).style.background='#3adb76';
        document.getElementById(pressed_button).innerHTML = 'Success (Presss to Update)';
        jsmeApplet.clear();
      }
    }

    document.getElementById("QMolButton").onclick = function () {
      takeStructure("QuestionMolecule", "QuestionMolecule_jme", "QMolButton");
    };

    document.getElementById("AMolButton").onclick = function() {
      takeStructure("AnswerMolecule", "AnswerMolecule_jme", "AMolButton");
    };
}
