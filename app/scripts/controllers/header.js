'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('HeaderCtrl', function ($scope, api, $state, modal, $timeout, $window, $rootScope, storage) {
  	$scope.logout = function(){
  		storage.delete('token');
  		storage.delete('user');
      delete $rootScope.isLogged;
      delete $rootScope.user;
  		delete $rootScope.grid;
  		$state.go('login');
  	}

  	$scope.cambiarEmpresa = function(){
         window.modal = modal.show({templateUrl : 'views/company/conectar.html', size :'sm', scope: $scope, backdrop:'static'}, function($scope){
            var _user = $rootScope.user;
            $scope.loading = true;
            api.empresa($scope.$parent.company._id).get().success(function(res){
              $timeout(function(){
                if(res._parent){
                  $rootScope.user._company = res._parent;
                  $rootScope.user._company = res;
                  storage.update('user', $rootScope.user);
                  toastr.success('Conectado con: ' + res.data.empresa , {timeOut: 10000});
                  $scope.loading = false;
                  $scope.$close();
                  $state.go('dashboard');
                  return;
                }

                $rootScope.user._company = res;
                storage.update('user', $rootScope.user);
                toastr.success('Conectado con: ' + res.data.empresa , {timeOut: 10000});
                $scope.loading = false;
                $scope.$close();
                $state.go('dashboard');
              }, 5000);
            });      
         });        
  	}
  });
