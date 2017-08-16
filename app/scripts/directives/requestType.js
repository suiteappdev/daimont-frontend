'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:estadoProducto
 * @description
 * # estadoProducto
 */
angular.module('shoplyApp')
  .directive('requestField', function () {
  	function ctrl($scope , constants) {
    		$scope.records = [
          { text :"Orden de Pedido", value:"Orden de Pedido" },
          { text :"Remisión", value:"Remisión"   }
        ]; 
  		
  		$scope.myConfig = {
    		  valueField: 'value',
    		  labelField: 'text',
    		  placeholder: 'Tipo',
    		  maxItems: 1,
          allowEmptyOption: $scope.emptyOption
  		};
  	}

    return {
      template: '<selectize config="myConfig" options="records" ng-model="ngModel"></selectize>',
      restrict: 'E',
      scope : {
      	ngModel : "=",
        emptyOption : "@"
      },
      controller : ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
  });