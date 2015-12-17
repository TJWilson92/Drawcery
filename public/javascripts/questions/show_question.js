function jsmeOnLoad() {

    jsmeApplet = new JSApplet.JSME("question_molecule_jsme", "500px", "500px", {
      "options": "oldlook, star"
    });

    var question_molecule = document.getElementById("QuestionMolecule_jme").value;
    console.log(question_molecule);
    jsmeApplet.readMolecule(question_molecule.toString());

    document.getElementById("resetMoleculeButton").onclick = function () {
      jsmeApplet.readMolecule(question_molecule);
    };

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
    }


}
