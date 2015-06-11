'use strict';
/*global require global*/
var assert = require('assert');
var LocalStorage = require('../js/storage/localstorage');

describe('Localstorage ', function() {
  it('is available', function () {
    assert.notEqual(new LocalStorage('todos'), undefined);
  });

  it('get value', function () {
    var storage = new LocalStorage('todos');

    global.localStorage = {
      getItem: function (key) {
        assert.equal(key, 'todos');
        return '{"key":"value"}';
      }
    };

    assert.deepEqual(storage.get(), {key: 'value'});
  });

  it('set value', function () {
    var storage = new LocalStorage('todos');

    global.localStorage = {
      setItem: function (key, value) {
        assert.equal(key, 'todos');
        assert.equal(value, '{"key":"value"}');
      }
    };

    storage.set({key: 'value'});
  });

  it('get and set value', function () {
    var storage = new LocalStorage('todos');
    var tmp = {};

    global.localStorage = {
      getItem: function (key) {
        return tmp[key];
      },
      setItem: function (key, value) {
        tmp[key] = value;
      }
    };

    var obj = {key: 'value'};
    storage.set(obj);

    assert.deepEqual(storage.get(), obj);
  });
});
