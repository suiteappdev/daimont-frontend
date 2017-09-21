'use strict';

angular.module('shoplyApp')
  .directive('carousel', function ($rootScope, $timeout) {
    return {
      replace:true,
      templateUrl: 'views/carousel/carousel.html',
      restrict: 'EA',
      scope : {
        interval  : "=",
        images : "=",
        controls : "="
      },
      link: function postLink(scope, element, attrs) {
        $(angular.element(element)[0]).carousel({
              interval: scope.interval,
        });
      }
    };
  });