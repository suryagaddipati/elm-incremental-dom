import Elm from './Todo.elm'
window.Elm = Elm
window.onload = function (){
  var storedState = localStorage.getItem('elm-todo-state');
  var startingState = storedState ? JSON.parse(storedState) : null;

  var todomvc = Elm.fullscreen(Elm.Todo, { getStorage: startingState });
  todomvc.ports.focus.subscribe(function(selector) {
    setTimeout(function() {
      var nodes = document.querySelectorAll(selector);
      if (nodes.length === 1 && document.activeElement !== nodes[0]) {
        nodes[0].focus()
      }
    }, 50);
  });

  todomvc.ports.setStorage.subscribe(function(state) {
    localStorage.setItem('elm-todo-state', JSON.stringify(state));
  });
}
