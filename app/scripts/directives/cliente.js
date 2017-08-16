'use strict';

angular.module('shoplyApp')
  .directive('clienteField', function () {
  	function ctrl($scope, api, modal, $rootScope){
      if($scope.data){
        $scope.records = data;
      }else{
        api.user().get().success(function(res){
          $scope.records = res.filter(function(_o){
            _o.full_name = _o.name ? _o.name +" "+ _o.last_name : _o.data.razon_social;
            return _o.type == "CLIENT";
          });
        });
      }

  		$scope.myConfig = {
        loadingClass: 'selectizeLoading',
        create : false,
  		  valueField: $scope.key,
       // maxOptions : 1,
  		  labelField: $scope.label,
  		  placeholder: 'Cliente',
        openOnFocus : false,
        selectOnTab : true,
        maxItems: 1,
        setFocus : $scope.setFocus || false
  		};

  	}

    return {
      template: '<selectize focus-on="true" config="myConfig" options="records" ng-model="ngModel"></selectize>',
      restrict: 'EA',
      scope : {
      	ngModel : "=ngModel",
        key : "@",
        label : "@",
        data:"=data",
        setFocus : "="
      },
      controller :ctrl,
      link: function postLink(scope, element, attrs) {
        scope.$root.$on('focusOn', function(evt, data){
          if(data){
            element[0].firstChild.selectize.focus();
          }
        });
      }
    };
  });