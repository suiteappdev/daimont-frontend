'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('CreditDetailCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout, $stateParams) {

    $scope.load = function(){
      if($stateParams.credit){
          api.credits($stateParams.credit).get().success(function(res){
                $scope.credit = res;
          });
      }
    }

    $scope.upgrade_plan = function(){
        var _user = angular.copy($scope.credit._user);

        window.modal = modal.show({templateUrl : 'views/credits/upgrade_plan.html', size:'lg', scope: this, backdrop: 'static', keyboard  : false}, function($scope){
             _user._plan = $scope.formPlan.data._plan;
              
              api.user(_user._id).put(_user).success(function(res){
                if(res){
                      new NotificationFx({
                          message : '<p>Plan actualizado.</p>',
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
        });  
    }

    $scope.approve = function(){
       modal.confirm({
               closeOnConfirm : true,
               title: "Está Seguro?",
               text: "Confirma que desea aprobar este credito?",
               confirmButtonColor: "#008086",
               type: "success" },
               function(isConfirm){ 
                   if (isConfirm) {
                   		$scope.credit.data.status = 'Aceptado';
            						api.credits().add("approved/" + $scope.credit._id).put($scope.credit).success(function(res){
            							if(res){
                            swal({
                                title: "Aprobado",
                                text: "Credito aprobado correctamente",
                                type: "success",
                                confirmButtonColor: "#008086",
                                closeOnConfirm: true,
                              });
            							}
            						}); 
                   }
        });
    }

    $scope.toFormData = function(obj, form, namespace) {
        var fd = form || new FormData();
        var formKey;
        
        for(var property in obj) {
          if(obj.hasOwnProperty(property) && obj[property]) {
            if (namespace) {
              formKey = namespace + '[' + property + ']';
            } else {
              formKey = property;
            }
           
            // if the property is an object, but not a File, use recursivity.
            if (obj[property] instanceof Date) {
              fd.append(formKey, obj[property].toISOString());
            }
            else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
              $scope.toFormData(obj[property], fd, formKey);
            } else { // if it's a string or a File object
              fd.append(formKey, obj[property]);
            }
          }
        }
        
        return fd;
    }

    $scope.done = function(){
       modal.confirm({
               closeOnConfirm : true,
               title: "Está Seguro?",
               text: "Confirma que ha transferido el monto a este cliente ?",
               confirmButtonColor: "#008086",
               type: "success" },
               function(isConfirm){ 
                   if (isConfirm) {
                      
                      $scope.credit.data.status = 'Consignado';
                      $scope.credit.data.deposited_time = new Date().toISOString();

          						api.credits().add("deposited/" + $scope.credit._id).put($scope.toFormData($scope.credit),{
                        transformRequest: angular.identity,
                        headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
                    }).success(function(res){
          							if(res){
                               swal({
                                title: "Bien Hecho",
                                text: "Credito Finalizado correctamente",
                                type: "success",
                                confirmButtonColor: "#008086",
                                closeOnConfirm: true,
                              });
          							}
          						}); 
                   }
        });
    }

   $scope.reject = function(){
       modal.confirm({
               closeOnConfirm : true,
               title: "Está Seguro?",
               text: "Confirma que rechaza el credito de este cliente?",
               confirmButtonColor: "#008086",
               type: "success" },
               function(isConfirm){ 
                   if (isConfirm) {
                      api.credits($scope.credit._id).put($scope.credit).success(function(res){
                        if(res){
                               swal({
                                title: "Bien Hecho",
                                text: "Credito Rechazado",
                                type: "success",
                                confirmButtonColor: "#008086",
                                closeOnConfirm: true,
                              });
                        }
                      }); 
                   }
        });
    } 

  });
