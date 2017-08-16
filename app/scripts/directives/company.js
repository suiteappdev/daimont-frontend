'use strict';

angular.module('shoplyApp')
  .directive('companyField', function () {
  	function ctrl($scope, api, modal, $rootScope){
  		api.empresa().add("user/" + $rootScope.user._id).get().success(function(res){
  			$scope.records = res.map(function(o){
          var _obj = new Object();
              _obj.name = o.data.empresa;
              _obj._id = o._id;
              _obj.decripcion = o.data.descripcion;

              return _obj; 
        }) || [];

  		});

  		$scope.myConfig = {
        loadingClass: 'selectizeLoading',
  		  valueField: $scope.key,
  		  labelField: $scope.label,
  		  placeholder: 'Empresa',
        maxItems: 1
  		};

  	}

    return {
      template: '<selectize config="myConfig" options="records" ng-model="ngModel"></selectize>',
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