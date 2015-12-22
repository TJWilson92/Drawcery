answer = interpretStringNodeObject(answer);
var editHistory = answer.molecule[0].editHistory;
var problem_molecule = answer.question[0].molecule_jme;
var answer_molecule = answer.molecule[0].structure_jme;

function jsmeOnLoad() {

  problem_applet = new JSApplet.JSME("jsme_problem", "500px", "500px", {
    "options": "oldlook, star"
  });

  answer_applet = new JSApplet.JSME("jsme_answer", "500px", "500px", {
    "options": "oldlook, star"
  });


  problem_applet.readMolecule(problem_molecule);
  answer_applet.readMolecule(answer_molecule);

}
