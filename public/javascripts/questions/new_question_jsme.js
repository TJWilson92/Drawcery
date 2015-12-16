function jsmeOnLoad() {

    jsmeApplet = new JSApplet.JSME("jsme_container", "500px", "500px", {
      "options": "oldlook, star"
    });

    function takeStructure(field_id, field_jme) {
      var formula = jsmeApplet.smiles();
      var jme = jsmeApplet.jmeFile();
      if (formula === "") {
        alert("No structure drawn");
      } else {
        document.getElementById(field_id).value = formula;
        document.getElementById(field_jme).value = jme;
        jsmeApplet.clear();
      }
    }

    document.getElementById("QMolButton").onclick = function () {
      takeStructure("QuestionMolecule", "QuestionMolecule_jme");
    };

    document.getElementById("AMolButton").onclick = function() {
      takeStructure("AnswerMolecule", "AnswerMolecule_jme");
    };



}
