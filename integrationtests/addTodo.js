'use strict';
/* global kommando  require __dirname */

var assertTrimmedString = require('./assertTrimmedString');

var path = require('path');
var fs = require('fs');

var config = require('./config');
var browser = kommando.browser;

var assert = require('assert');

browser.manage().window().setSize(800, 600);

describe('Add todo', function () {
  it('the new item element should be rendered', function (done) {
    browser.get(config.url)
      .then(function () {
        browser.executeScript('localStorage.clear()');
      })
      .then(function(){return (browser.isElementPresent(kommando.webdriver.By.id('new-todo'))); })
      .then(function (visible) {
        assert.equal(visible, true);
      })
      .then(done, done);
  });
  it('after submitting input we should see a new element', function (done) {
    browser.get(config.url)
      .then(function () {
        browser.executeScript('localStorage.clear()');
      })
      .then(function(){return (browser.findElement(kommando.webdriver.By.id('new-todo'))); })
      .then(function (element) {
        element.click();
        element.sendKeys('1');
        element.sendKeys(kommando.webdriver.Key.RETURN);
      }).then(function () {return (browser.findElements(kommando.webdriver.By.css('#todo-list > li'))); })
      .then(function (elements) {
        assert.equal(elements.length, 1);
      })
      .then(done, done);
  });
});
