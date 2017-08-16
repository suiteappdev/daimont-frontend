'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:ChangepasswordCtrl
 * @description
 * # ChangepasswordCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp').controller('RecoverCtrl', function ($scope, $stateParams, api, sweetAlert, account, storage, $state) {
    $scope.recover = function(){
      if($scope.recover_form.$valid){
          api.recover().post($scope.form.data).success(function(res){
            if(res){
                $scope.mailed =  true;
            }
          })
      }
    }
});
