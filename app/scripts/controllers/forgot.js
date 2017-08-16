'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('forgotCtrl', function ($scope, api, $state, modal, storage) {
  	$scope.recover = function(){
      if($scope.forgotForm.$invalid){
          modal.incompleteForm();
          return;
      }

      api.recover().post($scope.form.data).success(function(res){
        if(res){
          $scope.success = true;
        }
      }).error(function(){
      	  $scope.failed = true;
      });
  	}
  });
