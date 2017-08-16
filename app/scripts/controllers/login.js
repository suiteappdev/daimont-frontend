'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('LoginCtrl', function ($scope, sweetAlert, constants, $state, storage, account, $rootScope, Facebook, $stateParams, modal) {
  	$scope.load = function(){
      $scope.mailed = $stateParams.mailed || null;
      delete $scope.form;
      
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
          $rootScope.isLogged = true;
          
          $scope.me(function(data){
            $rootScope.user = data;
            storage.save('uid', data.id.toString());
          });
        } else {
          $rootScope.isLogged = false;
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
               text: "Confirma que desea pedir este credito?",
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
  		if($scope.loginForm.$invalid){
            modal.incompleteForm();
            return;
      }

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

        var _error = function(data){
          if(data == 409){
              sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
          }
        };

        account.usuario().ingresar($scope.form.data).then(_success, _error); 
  	}

    $scope.login_request = function(){
      if($scope.loginForm.$invalid){
            modal.incompleteForm();
            return;
      }

     modal.confirm({
             closeOnConfirm : true,
             title: "Está Seguro?",
             text: "Confirma que desea realizar este credito?",
             confirmButtonColor: "#008086",
             type: "success" },
             function(isConfirm){ 
                 if (isConfirm) {
                      if($scope.loginForm.$valid){
                        $scope.$parent.$parent.form.data.status = 'Pendiente';
                        $scope.login();
                      
                      }else if($scope.login.$invalid){
                        modal.incompleteForm();
                      } 
                 }
              })
    }

    $scope.logout = function(){
      window.localStorage.clear();
      
      delete $rootScope.isLogged;
      delete $rootScope.user;

      $state.go('home');
    }

    $scope.remember = function(remember){
      if(remember && $scope.form.data.email){
        storage.save('rememberEmail', $scope.form.data.email);
      }else{
        storage.delete('rememberEmail');
      }
    }
  });
