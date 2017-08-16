'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('CreditDetailCtrl', function ($scope, modal,  api, storage, $state, $rootScope, $timeout, $stateParams) {

    $scope.load = function(){
      $scope.credit = $stateParams.credit || null;
    }

  });
