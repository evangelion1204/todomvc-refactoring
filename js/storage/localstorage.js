'use strict';
/* global localStorage module */

function LocalStorage(key, storage) {

  this.get = function() {
    return (storage.getItem(key) && JSON.parse(storage.getItem(key))) || [];
  };
  this.set = function(todos) {
    storage.setItem(key, JSON.stringify(todos));
  };
}

module.exports = LocalStorage;
