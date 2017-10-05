'use strict';

angular.module('shoplyApp')
  .controller('profileCtrl', function ($scope, api, modal, constants, $state, storage, account, $rootScope, $stateParams, $timeout, $http) {
    $scope.ingresos_records = [
                        {number:500000,  value:"Menos de 500.000", text:"Menos de 500.000"},
                        {number:500001,  value:"De 500.000 hasta 1.000.000", text:"De 500.000 hasta 1.000.000"},
                        {number:1000001, value:"De 1.000.001 hasta 1.500.000", text:"De 1.000.001 hasta 1.500.000"},
                        {number:1500001, value:"De 1.500.001 hasta 2.000.000", text:"De 1.500.001 hasta 2.000.000"},
                        {number:2000001, value:"De 2.000.001 hasta 2.500.000", text:"De 2.000.001 hasta 2.500.000"},
                        {number:3000001, value:"De 3.000.001 hasta 3.500.000", text:"De 3.000.001 hasta 3.500.000"},
                        {number:4000001, value:"De 4.000.001 hasta 4.500.000", text:"De 4.000.001 hasta 4.500.000"},
                        {number:5000001, value:"De 5.000.001 hasta 5.500.000", text:"De 5.000.001 hasta 5.500.000"},
                        {number:5500001, value:"De 5.500.001 hasta 6.000.000", text:"De 5.500.001 hasta 6.000.000"},
                        {number:7000001, value:"De 6.000.001 en adelante", text:"De 6.000.000 en adelante"}
                    ];

    $scope.egresos_records = [
                        {number : 500000, value:"Menos de 500.000", text:"Menos de 500.000"},
                        {number : 500001, value:"De 500.000 hasta 1.000.000", text:"De 500.000 hasta 1.000.000"},
                        {number : 1000001, value:"De 1.000.001 hasta 1.500.000", text:"De 1.000.001 hasta 1.500.000"},
                        {number : 1500001, value:"De 1.500.001 hasta 2.000.000", text:"De 1.500.001 hasta 2.000.000"},
                        {number : 2000001, value:"De 2.000.001 hasta 2.500.000", text:"De 2.000.001 hasta 2.500.000"},
                        {number : 3000001, value:"De 3.000.001 hasta 3.500.000", text:"De 3.000.001 hasta 3.500.000"},
                        {number : 4000001, value:"De 4.000.001 hasta 4.500.000", text:"De 4.000.001 hasta 4.500.000"},
                        {number : 5000001, value:"De 5.000.001 hasta 5.500.000", text:"De 5.000.001 hasta 5.500.000"},
                        {number : 5500001, value:"De 5.500.001 hasta 6.000.000", text:"De 5.500.001 hasta 6.000.000"},
                        {number : 7000001, value:"De 6.000.001 en adelante", text:"De 6.000.000 en adelante"}
                    ];


    $scope.ingresos_setup = { 
        create:true, 
        maxItems:1, 
        valueField: 'value', 
        labelField: 'text', 
        placeholder:'Ingresos totales mensuales',
        onItemAdd : function(value, $item){
            $rootScope.user.data.ingresos_obj = $scope.ingresos_records.filter(function(obj){
                delete obj.$order;

                return obj.value == value;
            })[0];
        } 
    };

    $scope.egresos_setup = { 
            create:true, maxItems:1, 
            valueField: 'value', 
            labelField: 'text', 
            placeholder:'Egresos totales mensuales',
            onItemAdd : function(value, $item){
                $rootScope.user.data.egresos_obj = $scope.egresos_records.filter(function(obj){
                    delete obj.$order;

                    return obj.value == value;
                })[0];
            } 
    };
    
    $scope.load = function(){
        $scope.form = {};
        $scope.form.data = $rootScope.user;

        if($stateParams.credit){
            $scope.credit = $stateParams.credit;
        }
    }



    $scope.counter = 5;
    
    $scope.onTimeout = function(){
    
    if($scope.counter == 0){
        $scope.stop()

        var data = {};
        data._user = $rootScope.user._id;
        data._credit = $rootScope.current_credit._id;

        api.contracts().post(data).success(function(res){
            if(res){
                $state.go('dashboard.new_credit', { with_offer : true});
            }
        });

        return;
    }
        $scope.counter--;
        $scope.mytimeout = $timeout($scope.onTimeout, 1000);
    }

    $scope.viewContract = function(){
          Handlebars.registerHelper('formatCurrency', function(value) {
              return $filter('currency')(value);
          });

          $http.get('views/prints/contract.html').success(function(res){
                var _template = Handlebars.compile(res);

                var w = window.open("", "_blank", "scrollbars=yes,resizable=no,top=200,left=200,width=350");
                
                w.document.write(_template({}));
                w.print();
                w.close();
          });
    }

    $scope.logout = function(){
      window.localStorage.clear();
      
      delete $rootScope.isLogged;
      delete $rootScope.user;

      $state.go('home');
    }

    $scope.go_to = function(state){
            $state.go(state);
    }
        
    $scope.stop = function(){
        $timeout.cancel($scope.mytimeout);
    }

    $scope.go_back = function(){
        window.history.back();
    }

    $scope.update = function(){
        $rootScope.updating = true;
        window.scrollTo(0, 0);

        if($rootScope.user.data.updated){
            api.user($rootScope.user._id).put($rootScope.user).success(function(res){
                if(res){
                    storage.update("user", $rootScope.user);
                    $state.go('dashboard');
                }
            });

            return;
        }



        if($rootScope.user.data.ingresos_obj && $rootScope.user.data.egresos_obj){
            var _result = ($rootScope.user.data.ingresos_obj.number - $rootScope.user.data.egresos_obj.number);
            var _cupon = 0; 
            if(_result <= 1000000){
                _cupon = 150000;
            }else if(_result == 1500000 || _result == 2000000){
                _cupon = 250000;
            }else if( _result >= 2500000){
                _cupon = 250000;
            }  

            $rootScope.user.data.cupon = _cupon;                      
        }

        $rootScope.user.data.updated = true;

        if($rootScope.user.credit.data.amount[0] > _cupon){
            $rootScope.user.credit.data.with_offer = true;

            api.credits().add("current").get().success(function(res){
                if(res){
                    $rootScope.current_credit = res;
                    $scope.updateOfferCredit = res;
                    $scope.updateOfferCredit.data.with_offer = true;

                    api.credits($scope.updateOfferCredit._id).put($scope.updateOfferCredit).success(function(res){

                    });
                }
            })
        }

        api.user($rootScope.user._id).put($rootScope.user).success(function(res){
            if(res){
                storage.update("user", $rootScope.user);
                $scope.updated = true;

                if($rootScope.user.credit.data.amount[0] <= _cupon){
                        api.credits().add("current").get().success(function(res){
                            if(res){
                                $timeout(function(){
                                    modal.confirm({
                                             closeOnConfirm : true,
                                             confirmButtonText: "OK",
                                             title: "Resumen Enviado.",
                                             showCancelButton: false,
                                             showLoaderOnConfirm: true,
                                             text: "Enviamos correo con el resumen del credito a su correo, por favor lealo cuidadosamente antes de realizar la firma electronica, el correo puede llegar en su bandeja de entrada o Spam.",
                                             confirmButtonColor: "#008086",
                                             type: "success" },
                                             function(isConfirm){ 
                                                if (isConfirm) {
                                                        $rootScope.updating = false;

                                                        api.credits().add("email_request/" + res._id).get().success(function(res){
                                                          if(res){
                                                                $state.go('dashboard', { without_offer : true });
                                                          }
                                                        }); 
                                                }
                                      });

                                }, 10000);
                            }
                        })

                    /*api.credits().add("current").get().success(function(res){
                        if(res){
                            var data = {};
                            data._user = $rootScope.user._id;
                            data._credit = res._id;

                            api.contracts().post(data).success(function(res){
                                if(res){
                                    $state.go('dashboard', { without_offer : true });
                                }
                            });
                        }
                    }) */

                }else{
                    $state.go('dashboard.new_credit', { with_offer : true, reload:true});
                    $rootScope.updating = false;
                }
            }
        });

    }
  });