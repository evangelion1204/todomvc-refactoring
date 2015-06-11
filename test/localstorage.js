'use strict';
/*global require*/
var assert = require('assert');
var Storage = require('../js/storage/storage');

describe('Localstorage ', function() {
  it('is available', function () {
    assert.notEqual(new Storage('todos'), undefined);
  });

  it('get and set value', function () {
    var localStorage = {
      getItem: function (key) {
        return tmp[key];
      },
      setItem: function (key, value) {
        tmp[key] = value;
      }
    };
    var storage = new Storage('todos', localStorage);
    var tmp = {};


    var obj = {key: 'value'};
    storage.set(obj);

    assert.deepEqual(storage.get(), obj);
  });
});
