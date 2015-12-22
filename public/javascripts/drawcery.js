// Takes JSON.stringify -ed JSON object from the router and
// formats it so we can use it in javascript
function interpretStringNodeObject(object_string) {
  var result = object_string.replace(/&quot;/g, '\"');
  result = JSON.parse(result);
  return result;
}
