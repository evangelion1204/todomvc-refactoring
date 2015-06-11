'use strict';
/*global require*/
var assert = require('assert');
var Filter = require('../js/filter');

describe('Filter ', function() {
  it('is available', function () {
    assert.notEqual(new Filter());
  });
});
