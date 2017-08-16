'use strict';

angular.module('shoplyApp')
  .directive('referenceField', function () {
  	function ctrl($scope, api, modal, $rootScope){
  		$scope.myConfig = {
        create: true,
  		  valueField: $scope.key,
  		  labelField: $scope.label,
  		  placeholder: 'Escriba la referencia y presione [enter]',
        plugins: ['remove_button']
  		};

  	}

    return {
      template: '<selectize config="myConfig" options="[]" ng-model="ngModel"></selectize>',
      restrict: 'EA',
      scope : {
      	ngModel : "=",
        key : "@",
        label : "@"
      },
      controller :ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
  });