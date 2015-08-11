var IncrementalDOM = require('incremental-dom'),
  elementOpen = IncrementalDOM.elementOpen,
  elementClose = IncrementalDOM.elementClose,
  elementVoid = IncrementalDOM.elementVoid,
  text = IncrementalDOM.text,
  patch = IncrementalDOM.patch;

window.onload = function(){
  console.log('meow');
  patch(document.getElementById('main'), render);
}
function render(){
  elementOpen('h1', '', null);
  text("Meow");
  elementClose('h1');
}
