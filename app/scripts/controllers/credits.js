'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('CreditsCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout, $http) {
    $scope.items_tasks = [];
    $scope.Records  = false;

    $scope.load = function(){
      api.credits().add('all').get().success(function(res){
            $scope.records = res || []
            $scope.Records  = true;
      });
    }

    $scope.detail = function(){
      $state.go('detail', { credit : this.record._id } );
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

    $scope.early_payment = function(){
      $scope.paymentForm = {};

      console.log("deposited_time", $scope.current_credit.data.deposited_time)
      console.log("payday", $scope.current_credit.data.pay_day)

      var system = moment($scope.current_credit.data.deposited_time);
      var now = moment(new Date().toISOString());

      $scope.payForDays  = now.diff(system, 'days') == 0 ? 1 : now.diff(system, 'days');

      $scope.paymentForm.interests = (parseInt($scope.current_credit.data.amount[0]) * (2.4991666667 / 100));

      $scope.paymentForm.system_quote = ($scope.form.data.finance_quoteFixed + $scope.form.data.finance_quoteChange * $scope.payForDays);
      $scope.paymentForm.iva = $scope.paymentForm.system_quote * (19 / 100);
      
      $scope.paymentForm.interestsPeerDays = ( angular.copy($scope.paymentForm.interests) / 30 );
      $scope.paymentForm.interestsDays = ($scope.paymentForm.interestsPeerDays ) * $scope.payForDays;
      
      $scope.totalizePayment();        

    }

    $scope.delete_credit = function(){
         var record = this.record;
         var original = this.record;

         modal.confirm({
                 closeOnConfirm : true,
                 title: "Está Seguro?",
                 text: "Confirma que desea eliminar este prestamo?",
                 confirmButtonColor: "#008086",
                 type: "success" },

                 function(isConfirm){ 

                     if (isConfirm) {
                        
                        record.data.hidden = true;

                        api.credits(record._id).put(record).success(function(res){
                          if(res){
                             sweetAlert.close();
                             $scope.records.splice($scope.records.indexOf(original), 1);
                          } 
                        });
                     }

          });
    }

    $scope.logout = function(){
      window.localStorage.clear();
      
      delete $rootScope.isLogged;
      delete $rootScope.user;

      $state.go('home');
    }
  
  });
