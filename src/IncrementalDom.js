
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
export default function init(Elm){
  ElmNativeModule(Elm,'VirtualDom', {
    text: function (x) {
      var Element = Elm.Native.Graphics.Element.make(Elm);
      console.log(x)
      return {x};
    },
    render: function(data){


      const renderDom = function(data) {
        elementVoid('input', '', [ 'type', 'text' ]);
        elementOpen('div', '', null);
        text(data.x);
        elementClose('div');
      }



      var Element = Elm.Native.Graphics.Element.make(Elm);
      var element = Element.createNode('div');
      patch(element, ()=> {
        renderDom(data);
      });
      return element;
    },
    update: function(node, oldModel, newModel)
    {
      return node;
    },
    updateAndReplace: function(node, oldModel, newModel)
    {
      const renderDom = function(data) {
        elementVoid('input', '', [ 'type', 'text' ]);
        elementOpen('div', '', null);
        text(data.x);
        elementClose('div');
      }
      patch(node, ()=> {
        renderDom(newModel);
      });
      return node;
    }
  })
}
