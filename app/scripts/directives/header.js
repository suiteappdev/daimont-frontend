'use strict';
angular.module('shoplyApp')
  .directive('daimontHeader', function () {
      return {
          templateUrl: 'views/layout/daimont-header.html',
          restrict: 'EA',
          link: function postLink(scope, element, attrs) {

          }
      };
  });
