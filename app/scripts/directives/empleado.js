
  angular.module('shoplyApp')
  .directive('employeeField', function () {
    function ctrl($scope, api, modal, $rootScope){
      api.user().get().success(function(res){
        $scope.records = res.filter(function(_o){
            return _o.type == "EMPLOYE";
        });
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
      restrict: 'EA',
      scope : {
        ngModel : "=",
        key : "@",
        label : "@",
        placeholder : "@",
        allowEmptyOption : "@"
      },
      controller :ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
  });