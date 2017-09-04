'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('PlanesCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout, $stateParams) {
    $scope.Records  = false;

      $scope.load = function(){
            api.planes().get().success(function(res){
                  $scope.records = res || [];
                  $scope.Records  = true;
            });
      }

      $scope.edit = function(){
      	  $scope.formEditPlan = angular.copy(this.record);

	      window.modal = modal.show({templateUrl : 'views/plan/edit_plan.html', size:'lg', scope: this, backdrop: 'static', keyboard  : false}, function($scope){
	        	if($scope.formPlansEdit.$valid){

	        		api.planes($scope.formEditPlan._id).put($scope.formEditPlan).success(function(res){
	        			if(res){
	                    new NotificationFx({
	                        message : '<p>Registro actualizado.</p>',
	                        layout : 'growl',
	                        effect : 'genie',
	                        type : 'notice', // notice, warning or error
	                        onClose : function() {
	                          
	                        }
	                      }).show();   

	        			  $scope.load();
	          			  $scope.$close();
	        			}
	        		});
	        	}
	      }); 
      }

      $scope.delete = function(){
      	var _record = this.record._id;

            modal.removeConfirm({
                     closeOnConfirm : true,
                     confirmButtonColor: "#008086"
                 },
                     function(isConfirm){ 
                        if (isConfirm) {
				        		api.planes(_record).delete().success(function(res){
				        			if(res){
					                    new NotificationFx({
					                        message : '<p>Registro Borrado.</p>',
					                        layout : 'growl',
					                        effect : 'genie',
					                        type : 'notice', // notice, warning or error
					                        onClose : function() {
					                          
					                        }
					                      }).show();   

					        			  $scope.load();
					          			  $scope.$close();
				        			}
				        		}); 
                        }
              });
      }

      $scope.create = function(){
	      window.modal = modal.show({templateUrl : 'views/plan/new_plan.html', size:'lg', scope: this, backdrop: 'static', keyboard  : false}, function($scope){
	        	if($scope.formPlans.$valid){
	        		api.planes().post($scope.form).success(function(res){
	        			if(res){
							new NotificationFx({
		                        message : '<p>Registro Creado.</p>',
		                        layout : 'growl',
		                        effect : 'genie',
		                        type : 'notice', // notice, warning or error
		                        onClose : function() {
		                          
		                        }
	                      }).show();   

	        			   $scope.load();
	          			   $scope.$close();
	        			}
	        		});
	        	}
	      }); 
      }
  });
