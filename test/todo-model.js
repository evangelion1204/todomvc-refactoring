'use strict';
/*global require*/
var assert = require('assert');
var TodoModel = require('../js/todo-model');

describe('TodoModel ', function() {
  var storage = {
    get: function () {
      return null;
    }
  };
  it('is available', function () {
    assert.notEqual(new TodoModel(storage), undefined);
  });

  it('is available', function () {
    assert.notEqual(new TodoModel(storage), undefined);
  });
});
