function jsmeOnLoad() {

    jsmeApplet = new JSApplet.JSME("question_molecule_jsme", "500px", "500px", {
      "options": "oldlook, star"
    });

    var question_molecule = document.getElementById("QuestionMolecule_jme").value;
    console.log(question_molecule);
    jsmeApplet.readMolecule(question_molecule.toString());

}
