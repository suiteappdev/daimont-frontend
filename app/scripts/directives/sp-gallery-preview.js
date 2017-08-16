'use strict';
angular.module('shoplyApp')
  .directive('spGalleryPreview', function () {
  		function ctrl($scope){
  			$scope.setImage = function(){
  				$scope.selection = this.image;
  			}

  			$scope.next = function(){
  				if($scope.images.indexOf($scope.selection) == -1){
					$scope.selection = $scope.images[1];
					return;
  				}

  				$scope.selection = $scope.images[$scope.images.indexOf($scope.selection) + 1];
  			}

  			$scope.prev = function(){
          console.log("indice", $scope.images.indexOf($scope.selection));
          if($scope.images.indexOf($scope.selection) == 0 || $scope.images.indexOf($scope.selection) == -1){
                $scope.selection = $scope.images[($scope.images.length - 1)]
                return;
          }

          $scope.selection = $scope.images[$scope.images.indexOf($scope.selection) -1];
  			}

  		}

      return {
          templateUrl: 'views/system-shoply/sp-gallery-preview.html',
          restrict: 'EA',
          scope:{
          	images :'='
          },
          controller : ctrl,
          link: function postLink(scope, element, attrs) {

          }
      };
  });
