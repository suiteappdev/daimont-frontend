'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:iva
 * @description
 * # iva
 */
angular.module('shoplyApp')
  .directive('casaComercial', function () {
  	function ctrl($scope , constants, api) {
      api.casa_comercial().get().success(function(res){
        $scope.records = res.map(function(o){
          var _obj = new Object();

              _obj.name = o.data.descripcion_corta;
              _obj._id = o._id;
              return _obj; 
        }) || [];
      });

      $scope.myConfig = {
        valueField: $scope.key,
        labelField: $scope.label,
        placeholder: $scope.placeholder,
        maxItems: 1,
        allowEmptyOption: $scope.emptyOption,
      };
  	}

    return {
      template: '<selectize config="myConfig" options="records" ng-model="ngModel"></selectize>',
      restrict: 'E',
      scope : {
        ngModel : "=",
        key : "@",
        label : "@",
        emptyOption : '@',
        placeholder : '@' 
      },
      controller : ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
  });
