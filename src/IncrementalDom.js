
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
function makeNode(name,propertyList,contents){
  var List = Elm.Native.List.make(Elm);
  return () =>{
    elementOpen(name, '', null);
    List.toArray(contents).forEach( x => x())
    elementClose(name);
  };
}

function incrementalDOM(Elm){
  return {
    node: function(name, x, y){
      return F2(function(propertyList, contents) {
        return makeNode(name, propertyList, contents);
      });
    },

    text: function(x) {
      return function(){
        elementOpen('div', '', null);
        text(x);
        elementClose('div');
      }
    },
    render: function(func){
      var Element = Elm.Native.Graphics.Element.make(Elm);
      var element = Element.createNode('div');
      patch(element, ()=>{
        func();
      });
      return element;
    },
    updateAndReplace: function(node, oldModel, newFunc)
    {
      patch(node, function(){
        newFunc();
      });
      return node;
    },
    attribute: function(key,value){
      return F2( {
        key: "keySomething",
        value: {
          attrKey: key,
          attrValue: value
        }
      });
    }
  }
}



ElmNativeModule(Elm,'VirtualDom', incrementalDOM(Elm))
