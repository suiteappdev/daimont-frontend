'use strict';
angular.module('shoplyApp')
  .directive('daimontFooter', function () {
      return {
          templateUrl: 'views/layout/daimont-footer.html',
          restrict: 'EA',
          link: function postLink(scope, element, attrs) {

          }
      };
  });
