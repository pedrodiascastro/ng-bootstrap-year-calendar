ng-bootstrap-year-calendar
===================

[![Build Status](https://travis-ci.org/pedrodiascastro/ng-bootstrap-year-calendar.svg?branch=master)](https://travis-ci.org/pedrodiascastro/ng-bootstrap-year-calendar)

AngularJS version of [bootstrap-year-calendar](www.bootstrap-year-calendar.com), a year calendar widget, for boostrap !

This is mostly cool because you there's no complicated setup.

![alt tag](/assets/img/preview.jpg)

Demo is available at: [Plunkr Demo](http://plnkr.co/edit/jqSJt4LF1PJoeG63OCKI?p=preview)

## Requirements:

 - AngularJS 1.2+
 - Bootstrap v3.0.0 or later
 - Font-Awesome v4.4.0 or later 
 - jQuery v1.8.0 or later

<!--**File Size:** 2.4Kb minified, 0.5Kb gzipped-->

## Features
 - Add events
 - Context menu

## Usage:

 1. Include the year calendar as a dependency for your app.  If you want animations, include `ngAnimate` as well. *note: ngAnimate is optional*

 ```javascript
    angular.module("cal", ['ui.bootstrap','ng.bootstrap.year.calendar']);
 ```

 2. Create an element to hold the calendar.
 ```html
    <uib-year-calendar></uib-year-calendar>
 ```

## License:
Licensed under the  [Apache license V2.0](http://www.apache.org/licenses/LICENSE-2.0)
