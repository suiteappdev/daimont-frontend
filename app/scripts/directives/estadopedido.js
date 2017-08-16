'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:estadoPedido
 * @description
 * # estadoPedido
 */
angular.module('shoplyApp')
  .directive('estadoPedido', function () {
  	function ctrl($scope , constants) {
  		$scope.records = constants.request_status; 
		
  		$scope.myConfig = {
  		  valueField: 'status',
        allowEmptyOption : true,
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
