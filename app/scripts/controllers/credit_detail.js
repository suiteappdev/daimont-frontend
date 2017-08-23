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
      $scope.credit = $stateParams.credit || null;
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
            						api.credits($scope.credit._id).put($scope.credit).success(function(res){
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
                      
          						api.credits($scope.credit._id).put($scope.credit).success(function(res){
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

  });
