'use strict';
/*global require*/
var assert = require('assert');
var Storage = require('../js/storage/storage');

describe('Localstorage ', function() {
  it('is available', function () {
    assert.notEqual(new Storage('todos'), undefined);
  });

  it('get and set value', function () {
    var tmp = {};
    var localStorage = {
      getItem: function (key) {
        return tmp[key];
      },
      setItem: function (key, value) {
        tmp[key] = value;
      }
    };
    var storage = new Storage('todos', localStorage);


    var obj = {key: 'value'};
    storage.set(obj);

    assert.deepEqual(storage.get(), obj);
  });

  it('should return a default of [] if nothing saved', function () {
    var localStorage = {
      getItem: function () {
        return undefined;
      }
    };

    var storage = new Storage('todos', localStorage);

    assert.deepEqual(storage.get(), []);
  });
});
