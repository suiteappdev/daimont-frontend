'use strict';
angular.module('shoplyApp')
  .directive('spHeaderToolbar', function () {
      return {
          templateUrl: 'views/system-shoply/sp-header-toolbar.html',
          restrict: 'EA',
          link: function postLink(scope, element, attrs) {

          }
      };
  });
