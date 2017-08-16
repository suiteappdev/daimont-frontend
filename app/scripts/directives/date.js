  angular.module('shoplyApp').directive('dateField', function ( $timeout ) {
    function ctrl($scope, api, modal, $rootScope){

    }

    return {
      replace:true,
      template: '<input data-theme="datedrop-custom-theme" data-translate-mode="true" data-modal="true" data-large-default="true" data-large-mode="true" data-format="d-m-Y" type="text"  id="fecha" data-lang="es" class="form-control" />',
      restrict: 'EA',
      scope : {
        ngModel : "=",
        placeholder : "@",
        modal : '@',
        required : '@'
      },
      controller :ctrl,
      link: function postLink(scope, element, attrs) {
        $timeout(function(){
            $(element[0]).dateDropper();
        });
      }
    };
  });