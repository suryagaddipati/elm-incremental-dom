
var IncrementalDOM = require('incremental-dom'),
  elementOpen = IncrementalDOM.elementOpen,
  elementClose = IncrementalDOM.elementClose,
  elementVoid = IncrementalDOM.elementVoid,
  text = IncrementalDOM.text;
var patch = require('incremental-dom').patch;
import Lazy from './Lazy.js'

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
  var properties = [];
  List.toArray(propertyList).forEach(x => {
    properties.push(x.key)
    properties.push(x.value)
  })
  return () =>{
    elementOpen(name, '', properties);
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
        text(x);
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
    attribute: F2(function(key,value){
      return {key,value};
    }),
    lazy: F2(Lazy.lazyRef),
    lazy2: F3(Lazy.lazyRef2),
    lazy3: F4(Lazy.lazyRef3),

  }
}



ElmNativeModule(Elm,'VirtualDom', incrementalDOM(Elm))
