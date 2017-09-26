'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('DashboardCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout, $http, $stateParams) {
    $scope.current_date = new Date();
    $scope.form = {};
    $scope.form.data = {};
    $scope.form.data.finance_quoteFixed = 12990;
    $scope.form.data.finance_quoteChange = 960;
    $scope.isNew = false;
    $scope.items_tasks = [];
    $scope.current_credit = false;
    $scope.records = [];
    $scope.Records  = false;
    $scope.have_contract = false;
    $scope.is_transfered = false;

    $scope.load = function(){

      if($stateParams.signed){
            $scope.signed = true;
      }

      api.credits().add("max_amount").get().success(function(res){
          $scope.cupon = res || [];
      });

      api.credits().add('current').get().success(function(res){
            $scope.Records  = true;
            $scope.records = res.length == 0 ? [] : [res];
            $scope.current_credit = $scope.records[0];  
            
            $scope.have_contract = $scope.current_credit._contract || false;
            $scope.is_transfered = ($scope.current_credit.data.status =='Consignado');
            
            if($scope.current_credit){
                $scope.early_payment();
            }
      });

      if($stateParams.credit){

      }

      api.payments().get().success(function(res){
            $scope.payments = res || [];  
      });

      $scope.form.data.pay_day = $scope.pay_day($scope.form.data.days[0]).toISOString();

    }

    $scope.delete_credit = function(){
        modal.removeConfirm({closeOnConfirm : true}, 
            function(isConfirm){ 
               if (isConfirm) {
                    $scope.current_credit.data.hidden = true;
                    api.credits($scope.current_credit._id).put($scope.current_credit).success(function(res){
                      if(res){
                          sweetAlert.close();
                          
                          if($scope.isNew){
                              $scope.isNew = false;
                          }

                          $scope.load();
                      } 
                    });
               }
           });
    }

    $scope.update_cupon = function(){
            modal.confirm({
                   closeOnConfirm : true,
                   title: "Ampliación de cupo",
                   text: "¿confirma que desea ampliar su cupo ? ",
                   confirmButtonColor: "#008086",
                   type: "success" },
                   function(isConfirm){ 
                      if (isConfirm) {
                            $rootScope.user.data.cupon = (parseInt($scope.cupon[0]) + 100000);

                            api.user($rootScope.user._id).put($rootScope.user).success(function(res){
                                if(res){
                                    storage.update("user", $rootScope.user);
                                     new NotificationFx({
                                            message : '<p>Tu cupo de credito ha sido actualizado.</p>',
                                            layout : 'growl',
                                            effect : 'genie',
                                            type : 'notice', // notice, warning or error
                                            onClose : function() {
                                              
                                            }
                                      }).show();  
                                }
                            });
                      }
            });  
    }

    $scope.confirm = function(){
        if(!$rootScope.user.data.updated){
            modal.confirm({
                   closeOnConfirm : true,
                   title: "Accion requerida",
                   text: "actualiza tu información personal para continuar...",
                   confirmButtonColor: "#008086",
                   type: "success" },
                   function(isConfirm){ 
                      if (isConfirm) {
                        $state.go('profile', { credit : $scope.current_credit._id});
                      }
            });          
        }else{
        var data = {};
        data._user = $rootScope.user._id;
        data._credit = $scope.current_credit._id;

        api.contracts().post(data).success(function(res){
            if(res){
                  swal({
                    title: "Firmar Contrato",
                    text: "Hemos enviado un codigo a tu bandeja de entrada o spam",
                    type: "input",
                    confirmButtonColor: "#008086", 
                    confirmButtonText: "Firmar",
                    cancelButtonText: "Cancelar",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Escribe el codigo de 6 caracteres"
                  },
                  function(inputValue){
                    if (inputValue === false) return false;
                    
                    if (inputValue === "") {
                      swal.showInputError("Tu firma es incorrecta!");
                      return false
                    }

                    api.contracts().add("verify/" + inputValue).get().success(function(res){
                      if(res){
                            if(res.length == 0 ){
                              swal.showInputError("Tu firma es incorrecta!");
                            }else{
                                  api.credits($scope.current_credit._id).put({ _contract : res._id }).success(function(response){
                                      if(response){
                                          $state.go('dashboard', { signed : true});
                                          sweetAlert.close()                          
                                      }
                                  });
                            }
                      }
                    });

                  });                
            }
        });
        }
    }

     $scope.inc_amount = function(){
            var _current_amount = $scope.amount_instance.get();
            var steps = $scope.amount_instance.options.step;
            var value = (parseInt(_current_amount) + steps);

            $scope.amount_instance.set(value);        
      }

      $scope.dec_amount = function(){
          var _current_amount = $scope.amount_instance.get();
          var steps = $scope.amount_instance.options.step;
          var value = (parseInt(_current_amount) - steps);

          $scope.amount_instance.set(value);      
      }

      $scope.inc_days = function(){
          var _current_day = $scope.days_instance.get();
          var steps = $scope.days_instance.options.step;
          var value = (parseInt(_current_day) + steps);

          $scope.days_instance.set(value);  
      }

      $scope.dec_days = function(){
          var _current_day = $scope.days_instance.get();
          var steps = $scope.days_instance.options.step;
          var value = (parseInt(_current_day) - steps);

          $scope.days_instance.set(value);  
      }

    $scope.$watch('new_payment_form.transaction', function(o, n){
      if(n){
            modal.confirm({
                     closeOnConfirm : true,
                     title: "Está Seguro?",
                     text: "Confirma que has realizado el pago ?",
                     confirmButtonColor: "#008086",
                     type: "success" },

                     function(isConfirm){ 

                        if (isConfirm) {
                            $scope.new_payment();
                        }
              });
      }

      if(o){


        modal.confirm({
             closeOnConfirm : true,
             title: "Está Seguro?",
             text: "Confirma que has realizado el pago ?",
             confirmButtonColor: "#008086",
             type: "success" },

             function(isConfirm){ 

                if (isConfirm) {
                    $scope.new_payment();
                }
        });  
      }
    });

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
      $state.go('detail', { credit : this.record._id } );
    }

    $scope.show_banks = function(){
      window.modal = modal.show({templateUrl : 'views/dashboard/payment.html', size:'lg', scope: this, backdrop: true, show : true, keyboard  : true}, function($scope){
          
          $rootScope.bank_selected = true;

          $scope.$close();
      }); 
    }

    $scope.show_details = function(){
        $scope.show_detail = $scope.show_detail ? false : true;
    }

    $scope.new_payment = function(){
      $scope.new_payment_form.data = $scope.paymentForm;
      $scope.new_payment_form.data.bank = $rootScope.banco;
      $scope.new_payment_form._credit = $scope.current_credit._id;

      api.payments().post($scope.toFormData($scope.new_payment_form), {
        transformRequest: angular.identity,
        headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
        }).success(function(res){
              
              if(res){
                  $scope.current_credit._payment = res._id;
                  $scope.current_credit._contract = $scope.current_credit._contract._id || null;

                  api.credits($scope.current_credit._id).put($scope.current_credit).success(function(response){
                    if(response){
                    
                    }
                  });

                  $scope.load();
              }

             new NotificationFx({
                  message : '<p>Tu evidencia de pago a sido recibida.</p>',
                  layout : 'growl',
                  effect : 'genie',
                  type : 'notice', // notice, warning or error
                  onClose : function() {
                    
                  }
            }).show();     
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
      $scope.form._user = storage.get('uid') || $rootScope.user._id;
      $scope.form.data.status = 'Pendiente';
      $scope.form.owner = storage.get('uid') || $rootScope.user._id;

      api.credits().post($scope.form).success(function(res){
        if(res){
            $state.go('dashboard');
            $scope.isNew = true;
            $scope.load();
        } 
      });

    }

    $scope.upload = function(){
      $('#transaction').click();
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

    $scope.totalizePayment = function(){
      $scope.paymentForm.total_payment = (parseInt($scope.current_credit.data.amount[0])) + ($scope.paymentForm.interestsDays) + ($scope.paymentForm.system_quote || 0) + ($scope.paymentForm.iva || 0);
    }

    $scope.logout = function(){
      window.localStorage.clear();
      
      delete $rootScope.isLogged;
      delete $rootScope.user;

      $state.go('home');
    }


    $scope.pay_day = function (days){
      var today = new Date();

      return  new Date(today.getTime() + (days * 24 * 3600 * 1000));
    }

    $scope.totalize = function(){
      $scope.form.data.total_payment = ($scope.form.data.amount[0]) + ($scope.form.data.interestsDays || $scope.form.data.interests) + ($scope.form.data.system_quote || $scope.form.data.system_quote || 0) + ($scope.form.data.ivaDays || $scope.form.data.iva || 0) + ( $scope.form.data.finance_quote || 0);
    }

    $scope.$watch('form.data.days', function(o, n){
        if(n){
            $scope.form.data.pay_day = $scope.pay_day(n[0]); 
            $scope.form.data.interestsPeerDays = ( angular.copy($scope.form.data.interests) / 30 );
            $scope.form.data.interestsDays = ($scope.form.data.interestsPeerDays) * n[0];
            $scope.form.data.system_quote = ($scope.form.data.finance_quoteFixed + $scope.form.data.finance_quoteChange * n[0]);
            $scope.form.data.ivaPeerdays = (angular.copy($scope.form.data.iva) / 30);
            $scope.form.data.ivaDays = ($scope.form.data.finance_quote + $scope.form.data.system_quoteDays || $scope.form.data.system_quote ) * (19 / 100);
            
            $scope.totalize();      

        }

        if(o){
            $scope.form.data.pay_day = $scope.pay_day(o[0]); 
            $scope.form.data.interestsPeerDays = ( angular.copy($scope.form.data.interests) / 30 );
            $scope.form.data.interestsDays = $scope.form.data.interestsPeerDays * o[0];

            $scope.form.data.system_quote = ($scope.form.data.finance_quoteFixed + $scope.form.data.finance_quoteChange * o[0]);
            $scope.form.data.ivaPeerdays = (angular.copy($scope.form.data.iva) / 30);
            $scope.form.data.ivaDays = ($scope.form.data.finance_quote + $scope.form.data.system_quoteDays || $scope.form.data.system_quote ) * (19 / 100);
            
            $scope.totalize();      
        }
    });

    $scope.$watch('form.data.amount', function(o, n){
        var message;

        if(n){

              if(n[0] >= ($rootScope.user.data.cupon || 300000) && !$scope.show_warning_msg){
                    $scope.show_warning_msg = true;
              }else if(n[0] == 300000 && $scope.show_warning_msg){
                    $scope.show_warning_msg = false;
              }
               

              $scope.form.data.interests = (n[0] * (2.4991666667 / 100));
              $scope.form.data.system_quote = ($scope.form.data.finance_quoteFixed + $scope.form.data.finance_quoteChange * $scope.form.data.days[0]);
              $scope.form.data.iva = (($scope.form.data.system_quote + $scope.form.data.finance_quote) * (19 / 100));
              
              $scope.form.data.interestsPeerDays = ( angular.copy($scope.form.data.interests) / 30 );
              $scope.form.data.interestsDays = ($scope.form.data.interestsPeerDays) * $scope.form.data.days[0];

              $scope.form.data.system_quotePeerDays = (angular.copy($scope.form.data.system_quote) / 30 ); 
              $scope.form.data.system_quoteDays = ($scope.form.data.system_quotePeerDays) * ($scope.form.data.days[0]);

              $scope.form.data.ivaPeerdays = (angular.copy($scope.form.data.iva) / 30);
              $scope.form.data.ivaDays = ($scope.form.data.finance_quote + $scope.form.data.system_quoteDays ||  $scope.form.data.system_quote  ) * (19 / 100);
              $scope.totalize();      
        }

        if(o){

              if(o[0] >= ($rootScope.user.data.cupon || 300000) && !$scope.show_warning_msg){
                    $scope.show_warning_msg = true;
              }else if(o[0] == 300000 && $scope.show_warning_msg){
                    $scope.show_warning_msg = false;
              }

              $scope.form.data.interests = (o[0] * (2.4991666667 / 100));
              $scope.form.data.system_quote = ($scope.form.data.finance_quoteFixed + $scope.form.data.finance_quoteChange * $scope.form.data.days[0]);

              $scope.form.data.iva = (($scope.form.data.system_quote + $scope.form.data.finance_quote) * (19 / 100));
              
              $scope.form.data.interestsPeerDays = ( angular.copy($scope.form.data.interests) / 30 );
              $scope.form.data.interestsDays = ($scope.form.data.interestsPeerDays) * $scope.form.data.days[0];

              $scope.form.data.system_quotePeerDays = (angular.copy($scope.form.data.system_quote) / 30 ); 
              $scope.form.data.system_quoteDays = ($scope.form.data.system_quotePeerDays) * ($scope.form.data.days[0]);

              $scope.form.data.ivaPeerdays = (angular.copy($scope.form.data.iva) / 30);
              $scope.form.data.ivaDays = ($scope.form.data.finance_quote + $scope.form.data.system_quoteDays ||  $scope.form.data.system_quote  ) * (19 / 100);
              $scope.totalize();       
        }
    });
  
  });
