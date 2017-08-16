'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:estadoProducto
 * @description
 * # estadoProducto
 */
angular.module('shoplyApp')
  .directive('perfilField', function () {
  	function ctrl($scope , constants, api) {
        api.permiso().get().success(function(res){
          $scope.records = res.map(function(o){
              var _data = o.data;
                  _data._id = o._id;

                  return _data
          });
        });
  		
  		$scope.myConfig = {
    		  valueField: $scope.key,
    		  labelField:$scope.label,
    		  placeholder: 'Entidad',
    		  maxItems: 1,
          selectOnTab : true,
          onItemAdd : function(value, $item){
          angular.forEach($scope.records, function(v, k){
            if(v.value == value){
              $scope.setObject = $scope.records[k];
              return;
            }
          });

        } 
  		};
  	}

    return {
      template: '<selectize config="myConfig" options="records" ng-model="ngModel"></selectize>',
      restrict: 'E',
      scope : {
      	ngModel : "=",
        setObject : "=",
        key : '@',
        label : '@'
      },
      controller : ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
  });