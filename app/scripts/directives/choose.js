angular.module("shoplyApp").directive('choice', function ($rootScope) {
        return {
            restrict: 'A',
            scope: { 
                'choice': '=choice', 
                'value': '=value' 
            },
            link: function($scope, elem, attrs) {
                $scope.$watch("choice",                         
                   function (value) {
                       console.log(value == $scope.choice);
                     elem.toggleClass('sp-active',
                        value === $scope.value);
                });

                elem.addClass('sp-choosable');
                
                elem.bind('click', function() {
                    $scope.$apply(function() {
                        $scope.choice = $scope.value;
                    });
                }); 
                
                elem.on('$destroy', function() {
                    //cleanup
                });
            }
        }
    });