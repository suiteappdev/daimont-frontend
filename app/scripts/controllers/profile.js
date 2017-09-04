'use strict';

angular.module('shoplyApp')
  .controller('profileCtrl', function ($scope, api, modal, constants, $state, storage, account, $rootScope, $stateParams, $timeout, $http) {
    $scope.load = function(){
        console.log("PARAMS", $stateParams.contract);
        if($stateParams.token){
            api.user().add('activate/').post({ activation_token : $stateParams.token }).success(function(res){
                if(res){
                    $scope.activated = true;


                    $scope.form = {};
                    $scope.form.data = {};
                    $scope.form.data.name = res.name;
                    $scope.form.data.last_name = res.last_name;

                    $rootScope.user_id = res._id;
                    
                    if($stateParams.contract){
                        $scope.form.data.contract = $stateParams.contract || '';
                    }
                }
            });            
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
        
    $scope.stop = function(){
        $timeout.cancel($scope.mytimeout);
    }

    $scope.go_back = function(){
        window.history.back();
    }

    $scope.update = function(){
        $scope.form.data.updated = true;
        api.user($rootScope.user_id).put($scope.form).success(function(res){
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