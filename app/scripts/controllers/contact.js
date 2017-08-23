'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('contactCtrl', function ($scope, api) {
  	$scope.send = function(){
      if($scope.contactForm.$valid){
          api.contact().post($scope.form.data).success(function(res){
              if(res){
                  $scope.sended = true;
                  delete $scope.form;
              }
          }).error(function(){
              $scope.email_error = true;
          });
      }
    }
  });
