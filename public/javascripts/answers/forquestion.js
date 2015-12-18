function jsmeOnLoad() {
  problem_applet = new JSApplet.JSME("jsme_problem", "500px", "500px", {
    "options": "oldlook, star"
  });

  answer_applet = new JSApplet.JSME("jsme_solution", "500px", "500px", {
    "options": "oldlook, star"
  });

  var problem_molecule = document.getElementById("problem-molecule").innerHTML;
  var answer_molecule = document.getElementById("answer-molecule").innerHTML;
  problem_applet.readMolecule(problem_molecule);
  answer_applet.readMolecule(answer_molecule);
}
