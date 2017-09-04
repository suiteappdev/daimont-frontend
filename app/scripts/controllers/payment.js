'use strict';

angular.module('shoplyApp')
  .controller('paymentCtrl', function ($scope, api, modal, constants, $state, storage, account, $rootScope, $stateParams, $timeout) {
    $scope.load = function(){
    	api.payments().add("all").get().success(function(res){
    		$scope.records = res || [];
    	});

        if($stateParams.payment){
            $scope.payment = $stateParams.payment;
        }
    }
  });