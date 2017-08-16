angular.module('shoplyApp')
  .directive('uiFocus', function($timeout, $parse) {
    return {
      link: function(scope, element, attr) {
        var model = $parse(attr.uiFocus);
        scope.$watch(model, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });

        element.bind('blur', function() {
           scope.$apply(function(){
                model = false;
           });
        });
      }
    };
  });

angular.module('shoplyApp').directive('focusOn',function($timeout) {
    return {
        restrict : 'A',
        link : function($scope,$element,$attr) {
            $scope.$watch($attr.focusOn,function(_focusVal) {
                $timeout(function() {
                    _focusVal ? $element.focus() :
                        $element.blur();
                });
            });
        }
    }
})