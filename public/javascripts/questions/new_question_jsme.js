document.getElementById('createButton').style.display = 'none';
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
        document.getElementById(pressed_button).innerHTML = 'Success (Presss to Update)'
        jsmeApplet.clear();
      }
    }

    document.getElementById("QMolButton").onclick = function () {
      takeStructure("QuestionMolecule", "QuestionMolecule_jme", "QMolButton");
      checkIfBothStructuresPresent(['QuestionMolecule_jme', 'AnswerMolecule_jme'], 'createButton', 'noStructuresButton');
    };

    document.getElementById("AMolButton").onclick = function() {
      takeStructure("AnswerMolecule", "AnswerMolecule_jme", "AMolButton");
      checkIfBothStructuresPresent(['QuestionMolecule_jme', 'AnswerMolecule_jme'], 'createButton', 'noStructuresButton');
    };
}

// Function that checks to see if there is content in an array divs
// then reveals a button if there is
// jme_containers is an Array of div ids - expected length of 2
// progress_button is id for the button to be revealed
function checkIfBothStructuresPresent(jme_containers, progress_button, remove_button) {
  var contents1 = document.getElementById(jme_containers[0]).value;
  var contents2 = document.getElementById(jme_containers[1]).value;
  if (contents1 != "" & contents2 != "") {
      document.getElementById(remove_button).style.display='none';
      document.getElementById(progress_button).style.display = 'block';
  }

}
