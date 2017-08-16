/**
 * @ngdoc directive
 * @name shoplyApp.directive:iva
 * @description
 * # iva
 */
angular.module('shoplyApp').directive('reader', function (){
    return {
        require:'ngModel',
        scope: {
            reader: "="
        },
        link: function (scope, element, attributes, ngModel) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.reader = changeEvent.target.files[0];
                    var extension = changeEvent.target.files[0].name.substr(changeEvent.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();
                    var allowedExtensions = ['png', 'jpeg', 'jpg', 'pdf'];
                      
                    if (allowedExtensions.indexOf(extension) === -1){
                        ngModel.$valid = false;
                        ngModel.invalid_format = true;
                        return false;
                    }

                    console.log("file", changeEvent.target.files[0])
                    ngModel.$setViewValue(element.val());
                    ngModel.$render();
                });
            });
        }
    }
})