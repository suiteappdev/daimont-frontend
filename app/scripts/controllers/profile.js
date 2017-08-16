'use strict';

angular.module('shoplyApp')
  .controller('profileCtrl', function ($scope, api, modal, constants, $state, storage, account, $rootScope, $stateParams, $timeout) {
    $scope.load = function(){
        if($stateParams.token){
            api.user().add('activate/').post({ activation_token : $stateParams.token }).success(function(res){
                if(res){
                    $scope.activated = true;
                }
            });            
        }

        if($rootScope.user){
            $scope.form = {};
            $scope.form.data = {};
            $scope.form.data.name = $rootScope.user.name;
            $scope.form.data.last_name = $rootScope.user.last_name;
        }

        $state.go('profile.basic');
    }

    $scope.counter = 5;
    
    $scope.onTimeout = function(){
    
    if($scope.counter == 0){
        $scope.stop()
        $state.go('dashboard');
        return;
    }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout,1000);
    }
        
    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }

    $scope.go_back = function(){
        window.history.back();
    }

    $scope.update = function(){
        $scope.form.data.updated = true;
        api.user($rootScope.user._id).put($scope.form).success(function(res){
            if(res){
                console.log(res);
                storage.update("user", $rootScope.user);
                $scope.updated = true;
                var mytimeout = $timeout($scope.onTimeout,1000);
                delete $rootScope.beforeUpdate;
            }
        });
    }
  });