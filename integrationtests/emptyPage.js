'use strict';
/* global kommando  require __dirname */

var assertTrimmedString = require('./assertTrimmedString');

var path = require('path');
var fs = require('fs');

var config = require('./config');
var browser = kommando.browser;

browser.manage().window().setSize(800, 600);

describe('the basic site', function () {
  describe('should render correct ', function () {
    it('when nothing was clicked', function (done) {
      browser.get(config.url)
        .then(function () {
          browser.executeScript('localStorage.clear()');
        })
        .then(function(){return browser.findElement(kommando.webdriver.By.tagName('body')).getInnerHtml(); })
        .then(function (html) {
          //fs.writeFileSync(path.join(__dirname, 'golden-master.html'), html);
          var expected = fs.readFileSync(path.join(__dirname, 'golden-master.html'), 'utf8');
          assertTrimmedString(html, expected);
        })
        .then(done, done);
    });
  });
});
