'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:estadoProducto
 * @description
 * # estadoProducto
 */
angular.module('shoplyApp')
  .directive('estadoProducto', function () {
  	function ctrl($scope , constants) {
  		$scope.records = constants.product_status; 
		
		$scope.myConfig = {
		  valueField: 'status',
		  labelField: 'status',
		  placeholder: 'Estado',
		  maxItems: 1
		};
  	}

    return {
      template: '<selectize config="myConfig" options="records" ng-model="ngModel"></selectize>',
      restrict: 'E',
      scope : {
      	ngModel : "="
      },
      controller : ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
  });
