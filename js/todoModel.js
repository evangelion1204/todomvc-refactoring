'use strict';
var app = {};

function more() {
  var newObj = {};
  for (var i = 0; i < arguments.length; i++) {
    var obj = arguments[i];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

// Generic "model" object. You can use whatever
// framework you want. For this application it
// may not even be worth separating this logic
// out, but we do this to demonstrate one way to
// separate out parts of your application.
app.TodoModel = function(key) {
  this.key = key;
  this.todos = (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))) || [];
  this.onChanges = [];
};

app.TodoModel.prototype.subscribe = function(onChange) {
  this.onChanges.push(onChange);
};

app.TodoModel.prototype.inform = function() {
  localStorage.setItem(this.key, JSON.stringify(this.todos));
  this.onChanges.forEach(function(cb) { cb(); });
};

app.TodoModel.prototype.toggleAll = function(checked) {
  // Note: it's usually better to use immutable data structures since they're
  // easier to reason about and React works very well with them. That's why
  // we use map() and filter() everywhere instead of mutating the array or
  // todo items themselves.
  this.todos = this.todos.map(function(todo) {
    return more({}, todo, {completed: checked});
  });

  this.inform();
};

app.TodoModel.prototype.toggle = function(todoToToggle) {
  this.todos = this.todos.map(function(todo) {
    return todo !== todoToToggle ?
      todo :
      more({}, todo, {completed: !todo.completed});
  });

  this.inform();
};

app.TodoModel.prototype.destroy = function(todo) {
  this.todos = this.todos.filter(function(candidate) {
    return candidate !== todo;
  });

  this.inform();
};

app.TodoModel.prototype.save = function(todoToSave, text) {
  this.todos = this.todos.map(function(todo) {
    return todo !== todoToSave ? todo : more({}, todo, {title: text});
  });

  this.inform();
};

app.TodoModel.prototype.clearCompleted = function() {
  this.todos = this.todos.filter(function(todo) {
    return !todo.completed;
  });

  this.inform();
};
