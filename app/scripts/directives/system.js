'use strict';

angular.module('shoplyApp').directive('pageTitle', pageTitle);
angular.module('shoplyApp').directive('icheck', icheck);
angular.module('shoplyApp').directive('disableRightClick', disableRightClick);
angular.module('shoplyApp').directive('uiDate', uiDate);

function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title
                var title = 'DAIMONT';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'DAIMONT | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
};

function disableRightClick (){
    return {  
        restrict: 'A',  
        link: function(scope, element, attr) {  
            element.bind('contextmenu', function(e) {  
                e.preventDefault();  
            })  
        }  
    }  
}

function uiDate(){
    return {
      require: '?ngModel',
      link: function($scope, element, attrs, controller) {
          element.mask("99-99-9999",{completed: function() {
              controller.$setViewValue(Date.parse(this.val(),"dd-MM-yyyy"));
              $scope.$apply();
          }});
      }
    }; 
}
