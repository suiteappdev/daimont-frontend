'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('aboutCtrl', function ($scope) {
    $scope.myInterval = 3000;
  	
  	$scope.slides = [
  		{image: 'http://lorempixel.com/400/200/'},
  		{ image: 'http://lorempixel.com/400/200/food'},
  		{image: 'http://lorempixel.com/400/200/sports'},
  		{image: 'http://lorempixel.com/400/200/people'}
	];
  });
