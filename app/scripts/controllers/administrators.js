'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('EmployeesCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout, $stateParams) {
    $scope.Records  = false;

      $scope.load = function(){
            api.user().add("employees").get().success(function(res){
                  $scope.records = res || [];
                  $scope.Records  = true;
            });
      }

      $scope.create = function(){
	      window.modal = modal.show({templateUrl : 'views/administrators/new_administrator.html', size:'lg', scope: this, backdrop: 'static', keyboard  : false}, function($scope){
	        	if($scope.formAdministrator.$valid){
	        		$scope.form.data.type = 'ADMINISTRATOR';
	        		
	        		$scope.form.data.active = true;

	        		api.user().post($scope.form.data).success(function(res){
	        			if(res){
	        				alert("created");
	        			}
	        		});
	        	}
	          $scope.$close();
	      }); 
      }
  });
