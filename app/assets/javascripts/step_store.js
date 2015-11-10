(function(root){
  "use strict";

  StepStore = root.StepStore = {};

  var _steps = {};
  var _callbacks = [];

  StepStore.changed = function () {
    _callbacks.forEach(function (callback) {
        callback();
    });
  };

  StepStore.addChangedHandler = function (callback) {
    _callbacks.push(callback);
  };

  StepStore.removeChangedHandler = function (callback) {
    var idx = _callbacks.indexOf(callback);
    _callbacks.splice(idx, 1);
  };

  StepStore.all = function (todoId) {
    return _steps[todoId];
  };

  StepStore.fetch = function (todoId) {
    $.ajax({
      url: '/api/todos/'+ todoId +'/steps',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        _steps[todoId] = (data);
        StepStore.changed();
      }
    });
  };

  StepStore.create = function(step) {
    $.ajax({
      url: '/api/todos/' + step.todo_id + "/steps",
      type: 'POST',
      dataType: 'json',
      data: { step: step },
      success: function(data){
        if (_steps[step.todo_id] === null){
          _steps[step.todo_id] = [];
        }
        _steps[step.todo_id].push(data);
        StepStore.changed();
      }
    });
  };

  StepStore.destroy = function(step){
    var index = StepStore.find(step);
    if (index !== -1){
      $.ajax({
        url: "/api/steps/" + step.id,
        type: 'DELETE',
        dataType: 'json',
        success: function(){
          _steps[step.todo_id].splice(index, 1);
          StepStore.changed();
        }
      });
    }
  };

  StepStore.toggleDone = function(step) {
    var index = StepStore.find(step);

    if (index !== -1){
      var currentStep = _steps[step.todo_id][index];
      $.ajax({
        url: "/api/steps/" + step.id,
        type: 'PATCH',
        dataType: 'json',
        data: { step: {done:!(currentStep.done) }},
        success: function(){
          currentStep.done = !(currentStep.done);
          StepStore.changed();
        }
      });
    }
  };



  StepStore.find = function(step){
    var idx  = -1;
    var todoArray = _steps[step.todo_id];
    for (var i = 0; i < todoArray.length; i++){
      if (todoArray[i].id === step.id){
        idx = i;
      }
    }
    return idx;
  };

}(this));
