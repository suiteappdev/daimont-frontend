'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('signupCtrl', function ($scope, account, $state, sweetAlert, storage, Facebook, $rootScope, modal, api) {
  	
    $scope.register = function(){
      var _success = function(data){
        if(data){
           toastr.warning('Gracias por Registrarte');
           delete $scope.formRegister;
           $state.go('login');
        }
      };

      var _error = function(data){
        if(data == 409){
            sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
        }
      };

      if($scope.signup.$valid){
        if($scope.formRegister.data.password != $scope.formRegister.data.confirm_password){
            sweetAlert.swal("Formulario Incompleto.", "las contraseñas no coinciden.", "error");
            return;
        }
        
        account.usuario().register(angular.extend($scope.formRegister.data, {username : $scope.formRegister.data.email})).then(_success, _error);
      
      }else if($scope.signup.$invalid){
            modal.incompleteForm();
      }
  	};


    $scope.login = function(){
        var _success = function(res){
          if(res.user.type == "CLIENT" || res.user.type == "ADMINISTRATOR"){
              var  _user =  res.user;
              var  _token = res.token;
              storage.save('token', _token);
              storage.save('user', _user);
              storage.save('uid', _user._id);
              $rootScope.isLogged = true;
              $rootScope.user = storage.get('user');
              $state.go(constants.login_state_sucess);          
          }else{
            sweetAlert.swal("Inhabilitado.", "Privilegios son insuficientes.", "error");
            $scope.unprivileged = true;
          }
        };

        var _error = function(res){
            $scope.failed = true;
        };

        account.usuario().ingresar($scope.form.data).then(_success, _error); 
    }

    $scope.register_and_request = function(){
      if($scope.signup.$invalid){
            modal.incompleteForm();
            return;
      }

      var _success = function(data){
        if(data){
           $scope.login();
        }
      };

      var _error = function(data){
        if(data == 409){
            sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
        }
      };

     modal.confirm({
             closeOnConfirm : true,
             title: "Está Seguro?",
             text: "Confirma que desea realizar este credito?",
             confirmButtonColor: "#008086",
             type: "success" },
             function(isConfirm){ 
                 if (isConfirm) {
                      if($scope.signup.$valid){
                        if($scope.formRegister.data.password != $scope.formRegister.data.confirm_password){
                            sweetAlert.swal("Formulario Incompleto.", "las contraseñas no coinciden.", "error");
                            return;
                        }

                        $scope.$parent.$parent.form.data.status = 'Pendiente';
                        account.usuario().register(angular.extend($scope.formRegister.data, {username : $scope.formRegister.data.email, credit : $scope.$parent.$parent.form})).then(_success, _error);
                      
                      }else if($scope.signup.$invalid){
                            modal.incompleteForm();
                      } 
                 }
              })
    }

    $scope.load = function(){
      if(storage.get("rememberEmail")){
        $scope.fromStore = true;
        $scope.form = {};
        $scope.form.data = {};
        $scope.form.data.email = storage.get("rememberEmail");
      }
    }

    $scope.$watch(function() {
      return Facebook.isReady();
    }, function(newVal) {
      $scope.facebookReady = true;
    });

    $scope.getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $rootScope.loggedIn = true;
          $scope.me(function(data){
            $rootScope.user = data;
          });
        } else {
          $rootScope.loggedIn = false;
        }
      });
    };

    $scope.me = function(callback) {
      Facebook.api('/me', { "fields" :"id, name, email, first_name, last_name, picture" }, callback);
    };

    $scope.facebook_login = function() {
      var _success = function(data){
        if(data){
            $scope.me(function(response){
               $rootScope.isLogged = true;
               storage.save('uid', response.id.toString());
               storage.save('user', response);
               $rootScope.user = response;
               $rootScope.loggedIn = true;
               $state.go('dashboard');
            });
        }
      };

      var _error = function(data){
        if(data == 409){
            sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
        }
      };

       modal.confirm({
               closeOnConfirm : true,
               title: "Está Seguro?",
               text: "Confirma que desea realizar este prestamo?",
               confirmButtonColor: "#008086",
               type: "success" },

               function(isConfirm){ 
                   if (isConfirm) {
                        Facebook.login(function(response) {
                          if(response.status == 'connected'){
                              console.log("token", response.authResponse.accessToken);
                              var fb_token = response.authResponse.accessToken;
                              storage.save('access_token', fb_token.toString());
                              $scope.me(function(data){
                                 var new_user = {};
                                 new_user.data = {};
                                 new_user.metadata  = {};
                                 new_user.metadata._author  = data.id;
                                 new_user.name = data.first_name;
                                 new_user.last_name = data.last_name;
                                 new_user.data.facebook_id = data.id;
                                 new_user.email = data.email;
                                 new_user.credit = $scope.$parent.$parent.form;

                                account.usuario().register(new_user).then(_success, _error);
                              });          
                          }

                        }, { scope:'email' } );   
                   }
        });
    };

    $scope.login = function(){
        var _success = function(res){
          if(res){
              var  _user =  res.user;
              var  _token = res.token;

              storage.save('token', _token);
              storage.save('user', _user);
              storage.save('uid', _user._id);

              $rootScope.isLogged = true;
              $rootScope.user = res;

              $state.go('login', {mailed : true});
          }

        };

        var _error = function(res){
            $scope.failed = true;
        };

        account.usuario().ingresar({ email : $scope.formRegister.data.email, password : $scope.formRegister.data.password }).then(_success, _error); 
    }

    $scope.remember = function(remember){
      if(remember && $scope.form.data.email){
        storage.save('rememberEmail', $scope.form.data.email);
      }else{
        storage.delete('rememberEmail');
      }
    }

  });
