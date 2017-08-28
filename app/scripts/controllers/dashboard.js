'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('DashboardCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout, $http) {
    $scope.current_date = new Date();
    $scope.form = {};
    $scope.form.data = {};
    $scope.form.data.finance_quoteFixed = 12990;
    $scope.form.data.finance_quoteChange = 960;

    $scope.items_tasks = [];
    $scope.Records  = false;

    $scope.load = function(){
      api.credits().add('current').get().success(function(res){
            $scope.records = res.length == 0 ? [] : [res];
            $scope.current_credit = $scope.records[0];  
            $scope.Records  = true;          
      });

      api.payments().get().success(function(res){
            $scope.payments = res || [];  
      });

      $scope.form.data.pay_day = $scope.pay_day($scope.form.data.days[0]);
    }


    $scope.print_payment_order = function(){
      Handlebars.registerHelper('formatCurrency', function(value) {
          return $filter('currency')(value);
      });

      Handlebars.registerHelper("debug", function(optionalValue) {
          console.log("Current Context");
          console.log("====================");
          console.log(this);
         
          if (optionalValue) {
              console.log("Value");
              console.log("====================");
              console.log(optionalValue);
          }
      }); 

      var out = [];


      $http.get('views/prints/payment_order.html').success(function(res){
        var _template = Handlebars.compile(res);
        console.log("template", _template);

        var w = window.open("", "_blank", "scrollbars=yes,resizable=no,top=200,left=200,width=350");
        
        w.document.write(_template({_out : out}));
        w.print();
        w.close();
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

    $scope.detail = function(){
      $state.go('detail', { credit : this.record._id } );
    }

    $scope.payment = function(){
      window.modal = modal.show({templateUrl : 'views/dashboard/payment.html', size:'lg', scope: this, backdrop: 'static', keyboard  : false}, function($scope){
          modal.confirm({
               closeOnConfirm : true,
               title: "Está Seguro?",
               text: "Confirma que quiere gestionar este pago ?",
               confirmButtonColor: "#008086",
               type: "success" },

               function(isConfirm){ 
                   if (isConfirm) {
                      $scope.$parent.form.data = $scope.paymentForm;
                      
                      delete $scope.bank_obj.$order;
                      $scope.$parent.form.data.bank = $scope.bank_obj;
                      $scope.$parent.form.data.status = 'Gestion';

                      api.payments().post($scope.$parent.form).success(function(res){
                        if(res){
                            $scope.$parent.$parent.payment_done = true;
                            $scope.$close();
                            $scope.load();
                        }
                      });                      
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
       modal.confirm({
               closeOnConfirm : true,
               title: "Está Seguro?",
               text: "Confirma que desea realizar este credito?",
               confirmButtonColor: "#008086",
               type: "success" },

               function(isConfirm){ 

                   if (isConfirm) {
                    
                      $scope.form._user = storage.get('uid') || $rootScope.user._id;
                      $scope.form.data.status = 'Pendiente';
                      $scope.form.owner = storage.get('uid') || $rootScope.user._id;

                      api.credits().post($scope.form).success(function(res){
                        if(res){
                            sweetAlert.close();
                            $state.go('dashboard');
                            $scope.load();
                    
                           } 
                      });
                  }
        });
    }

    $scope.early_payment = function(){
      $scope.paymentForm = {};

      var system = moment($scope.current_credit.data.deposited_time);
      var now = moment("Sun Aug 30 2017 14:43:31 GMT-0500 (Hora est. Pacífico, Sudamérica");

      $scope.payForDays  = now.diff(system, 'days');
      $scope.paymentForm.interests = ($scope.current_credit.data.amount[0] * (2.4991666667 / 100));
      $scope.paymentForm.system_quote = ($scope.form.data.finance_quoteFixed + $scope.form.data.finance_quoteChange * $scope.payForDays);
      
      $scope.paymentForm.iva = (($scope.paymentForm.system_quote) * (19 / 100));
      
      $scope.paymentForm.interestsPeerDays = ( angular.copy($scope.current_credit.data.interests) / 30 );
      $scope.paymentForm.interestsDays = ($scope.current_credit.data.interestsPeerDays) * $scope.payForDays;

      $scope.paymentForm.system_quotePeerDays = (angular.copy($scope.form.data.system_quote) / 30 ); 
      $scope.paymentForm.system_quoteDays = ($scope.current_credit.data.system_quotePeerDays) * ($scope.payForDays);
      
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

    $scope.update_payment = function(payment){

      payment._credit = $scope.current_credit._id;
      api.payments().add("confirm").put($scope.toFormData(payment), {
                    transformRequest: angular.identity,
                    headers: {'Content-Type':undefined, enctype:'multipart/form-data'}
      }).success(function(res){
          if(res){
              $scope.load();
          }
      });  
    }

    $scope.pay_day = function (days){
      var today = new Date();

      return  new Date(today.getTime() + (days * 24 * 3600 * 1000));
    }

    $scope.totalize = function(){
      $scope.form.data.total_payment = ($scope.form.data.amount[0]) + ($scope.form.data.interests) + ($scope.form.data.system_quote || 0);
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
        if(n){
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
