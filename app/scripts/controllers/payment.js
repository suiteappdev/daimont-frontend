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

    $scope.show_user_detail = function(){
      $scope.current_payment = this.record;
      
      window.modal = modal.show({templateUrl : 'views/payments/user_detail.html', size:'lg', scope: this, backdrop: true, show : true, keyboard  : true}, function($scope){
          
          $scope.$close();
      }); 
    }
  });