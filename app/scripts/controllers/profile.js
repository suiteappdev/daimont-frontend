'use strict';

angular.module('shoplyApp')
  .controller('profileCtrl', function ($scope, api, modal, constants, $state, storage, account, $rootScope, $stateParams, $timeout, $http) {
    $scope.load = function(){
        $scope.form = {};
        $scope.form.data = $rootScope.user;
    }

    $scope.counter = 5;
    
    $scope.onTimeout = function(){
    
    if($scope.counter == 0){
        $scope.stop()
        $state.go('dashboard');
        return;
    }
        $scope.counter--;
        $scope.mytimeout = $timeout($scope.onTimeout,1000);
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
        $scope.form.data.updated = true;
        api.user($rootScope.user._id).put($scope.form.data).success(function(res){
            if(res){
                console.log(res);
                storage.update("user", $rootScope.user);
                $scope.updated = true;
                $scope.mytimeout = $timeout($scope.onTimeout,1000);
                delete $rootScope.beforeUpdate;
            }
        });
    }
  });