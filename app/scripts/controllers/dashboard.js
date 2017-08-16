'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('DashboardCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout) {
    $scope.current_date = new Date();
    $scope.form = {};
    $scope.form.data = {};
    $scope.form.data.system_quote = 5000;
    $scope.items_tasks = [];
    $scope.Records  = false;

    $scope.load = function(){
      api.credits().get().success(function(res){
          $scope.records = res || [];
          $scope.current_credit = res[0];
          $scope.Records  = true;          
      });

      $scope.form.data.pay_day = $scope.pay_day($scope.form.data.days[0]);
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

    $scope.detail = function(){
      $state.go('detail', { credit : this.record } );
    }

    $scope.payment = function(){
      window.modal = modal.show({templateUrl : 'views/dashboard/payment.html', size:'lg', scope: this, backdrop: 'static', keyboard  : false}, function($scope){
          
          api.payments().post($scope.toFormData($scope.$parent.form.data), {
                    transformRequest: angular.identity,
                    headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
                }).success(function(res){
            if(res){
                $scope.payment_done = true;
                $scope.$close();
                $scope.$apply();
            }
          });

      }); 
    }

    $scope.add_to_task = function(){
      if(this.record.add){
        $scope.items_tasks.push(this.record._id);
      }else{
        $scope.items_tasks.splice($scope.items_tasks.indexOf(this.record._id), 1);
      }
    }

    $scope.new_credit = function(){
      window.modal = modal.show({templateUrl : 'views/credits/new_credit.html', size:'lg', scope: $scope, backdrop: 'static'}, function($scope){
           modal.confirm({
                   closeOnConfirm : true,
                   title: "Está Seguro?",
                   text: "Confirma que desea realizar este prestamo?",
                   confirmButtonColor: "#008086",
                   type: "success" },

                   function(isConfirm){ 

                       if (isConfirm) {
                          api.credits().post($scope.form).success(function(res){
                            if(res){
                               sweetAlert.close();
                            } 
                          });
                       }

                    })
      });
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

    $scope.update_credit = function(){

    }

    $scope.pay_day = function (days){
      var today = new Date();

      return  new Date(today.getTime() + (days * 24 * 3600 * 1000));
    }

    $scope.totalize = function(){
      $scope.form.data.total_payment = ($scope.form.data.amount[0]) + ($scope.form.data.interests) + ($scope.form.data.system_quote || 0);
    }

    $scope.logout = function(){
      window.localStorage.clear();
      
      delete $rootScope.isLogged;
      delete $rootScope.user;

      $state.go('home');
    }

    $scope.$watch('form.data.days', function(o, n){
        if(n){
            $scope.form.data.pay_day = $scope.pay_day(n[0]);      
        }

        if(o){
            $scope.form.data.pay_day = $scope.pay_day(o[0]);      
        }
    });

    $scope.$watch('form.data.amount', function(o, n){
        if(n){
              $scope.form.data.interests = (n[0] * (1.817 / 100));
              $scope.totalize();      
        }

        if(o){
             $scope.form.data.interests = (o[0] * (1.817 / 100));
             $scope.totalize();      
        }
    });
  });
