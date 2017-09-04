
  angular.module('shoplyApp')
  .directive('plansField', function () {
    function ctrl($scope, api, modal, $rootScope){
      api.planes().get().success(function(res){
        $scope.records = res.map(function(plan){
          var _plan = {};
              _plan = plan.data;
              _plan._id = plan._id;

              return _plan;
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