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
	      {image : 'about_us_slide_1.jpg', active : true},
	      {image : 'about_us_slide_2.jpg'},
	      {image : 'about_us_slide_3.jpg'}
	   ];
  });
