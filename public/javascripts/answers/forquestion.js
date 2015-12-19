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
