(function (root) {
  "use strict";

  TodoStore = root.TodoStore = {};

  var _todos = [];
  var _callbacks = [];

  TodoStore.changed = function () {
    _callbacks.forEach(function (callback) {
        callback();
    });
  };

  TodoStore.addChangedHandler = function (callback) {
    _callbacks.push(callback);
  };

  TodoStore.removeChangedHandler = function (callback) {
    var idx = _callbacks.indexOf(callback);
    _callbacks.splice(idx, 1);
  };

  TodoStore.all = function () {
    return _todos;
  };

  TodoStore.fetch = function () {
    $.ajax({
      url: '/api/todos',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        _todos = data;
        TodoStore.changed();
      }
    });
  };

  TodoStore.create = function(todo) {
    $.ajax({
      url: '/api/todos',
      type: 'POST',
      dataType: 'json',
      data: { todo: todo },
      success: function(data){
        _todos.push(data);
        TodoStore.changed();
      }
    });
  };

  TodoStore.destroy = function(id){
    var index = TodoStore.find(id);
    if (index !== -1){
      $.ajax({
        url: "/api/todos/" + id,
        type: 'DELETE',
        dataType: 'json',
        success: function(){
          _todos.splice(index,1);
          TodoStore.changed();
        }
      });
    }
  };

  TodoStore.toggleDone = function(id) {
    var index = TodoStore.find(id);

    if (index !== -1){
      var currentTodo = _todos[index];
      $.ajax({
        url: "/api/todos/" + id,
        type: 'PATCH',
        dataType: 'json',
        data: { todo: {done:!(currentTodo.done) }},
        success: function(){
          TodoStore.changed();
          currentTodo.done = !(currentTodo.done);
        }
      });
    }
  };



  TodoStore.find = function(id){
    var idx  = -1;
    for (var i = 0; i < _todos.length; i++){
      if (_todos[i].id === id){
        idx = i;
      }
    }
    return idx;
  };

}(this));
