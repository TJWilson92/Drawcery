

function jsmeOnLoad() {

  $(document).ready(function () {
    // answer = interpretStringNodeObject(answer);
    // var editHistory = answer.molecule[0].editHistory;

    var problem_molecule = document.getElementById('problem_jme').innerHTML;
    var answer_molecule = document.getElementById('answer_jme').innerHTML;

    problem_applet = new JSApplet.JSME("jsme_problem", "500px", "500px", {
      "options": "oldlook, star"
    });

    answer_applet = new JSApplet.JSME("jsme_answer", "500px", "500px", {
      "options": "oldlook, star"
    });


    problem_applet.readMolecule(problem_molecule);
    answer_applet.readMolecule(answer_molecule);

  });
}
