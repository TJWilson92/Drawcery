// Wait until the JSME editor has loaded
function jsmeOnLoad() {

    jsmeApplet = new JSApplet.JSME("question_molecule_jsme", "500px", "500px", {
      "options": "oldlook, star"
    });

    // Get the molecular structure for the question
    var question_molecule = document.getElementById("QuestionMolecule_jme").value;
    // get JSME to read that
    jsmeApplet.readMolecule(question_molecule.toString());

    // Function to reset the molecule in the viewer to the original formula
    document.getElementById("resetMoleculeButton").onclick = function () {
      jsmeApplet.readMolecule(question_molecule);
    };

    // This takes the structure the user has drawn, and places it
    // as their answer - until they have done this, they cannot submit
    // their answer, because it takes the SMILE and JME file formats
    // But hides that latter from the student
    document.getElementById("take_jme").onclick = function () {
      formula = jsmeApplet.smiles();
      formula_jme = jsmeApplet.jmeFile();
      if (formula !== "") {
          document.getElementById("AnswerMolecule_smiles_input").value = formula;
          document.getElementById("AnswerMolecule_jme_input").value = formula_jme;
          document.getElementById("newAnswerSubmitButton").style.display ='block';
      } else {
        alert("No molecular structure detected");
      }
    };


    // Sort out creating editing analytics for person solving the problems
    // Create array to store edit history and record time that question lodaded
    var history = [];
    history.push(new Object({
      number: 0,
      action: "PageLoaded",
      atom: null,
      bond: null,
      time: Date.now()
    }));

    // Function to get and record the changes made to the molecule by the student
    // (for analytics)
    jsmeApplet.setAfterStructureModifiedCallback(EditMadeToMolecule);
    function EditMadeToMolecule(jsme_event) {
      // event is an object with properties:
      // action, actom, bond, molecule
      var entry = new Object({
        number: history.length,
        action: jsme_event.action,
        atom: jsme_event.atom,
        bond: jsme_event.bond,
        time: Date.now()
      });

      if (history[history.length - 1].action == entry.action & entry.atom === 0) {

      } else {
          history.push(entry);
          parsed = JSON.stringify(history);
          document.getElementById("EditHistory").value = parsed;
          console.log(parsed);
      }
    }




}
