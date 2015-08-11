
var IncrementalDOM = require('incremental-dom'),
  elementOpen = IncrementalDOM.elementOpen,
  elementClose = IncrementalDOM.elementClose,
  elementVoid = IncrementalDOM.elementVoid,
  text = IncrementalDOM.text;
var patch = require('incremental-dom').patch;

function ElmNativeModule(Elm,name, values) {
  Elm.Native[name] = {};
  Elm.Native[name].make = function(elm) {
    elm.Native = elm.Native || {};
    elm.Native[name] = elm.Native[name] || {};
    if (elm.Native[name].values) return elm.Native[name].values;
    return elm.Native[name].values = values;
  };
}
function renderDom(data) {
  elementOpen('div', '', null);
  text(data.x);
  elementClose('div');
}

function incrementalDOM(Elm){
  return {
    text(x) {
      return {x};
    },
    render(data){
      var Element = Elm.Native.Graphics.Element.make(Elm);
      var element = Element.createNode('div');
      patch(element, ()=> {
        renderDom(data);
      });
      return element;
    },
    updateAndReplace(node, oldModel, newModel)
    {
      patch(node, ()=> {
        renderDom(newModel);
      });
      return node;
    }
  }
}



export default function init(Elm){
  ElmNativeModule(Elm,'VirtualDom', incrementalDOM(Elm))
}
