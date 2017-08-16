'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:estadoPedido
 * @description
 * # estadoPedido
 */
angular.module('shoplyApp')
  .directive('phoneBook', function () {
  	function ctrl($scope , constants, $rootScope) {
  		$scope.records = $rootScope.user.metadata.phonebook; 

  		$scope.myConfig = {
  		  placeholder: 'Telefonos',
        create : true,
        delimiter : ","
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
