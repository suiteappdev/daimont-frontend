angular.module("shoplyApp").directive("cropper", function($rootScope, $timeout , modal){

	function ctrl($scope){
		$scope.open = function(){
		      modal.show({templateUrl : 'views/utils/cropper2.html', size :'md', scope: $scope}, function($scope){
		          $scope.$close();
		      });
		}
	} 

	function link($scope, $element, $attr){
        var handleFileSelect = function(evt) {
	          var file = evt.currentTarget.files[0];
	          var reader = new FileReader();
	          $scope.isLoaded = false;
	          
	          reader.onload = function (evt) {
		            $scope.$apply(function($scope){
		              	$scope.myImage = evt.target.result;
		              	$scope.isLoaded = true;
		              	$scope.open();
		            });
	          };

          	reader.readAsDataURL(file);
        };	

        $timeout(function(){
	        angular.element(document.querySelector('#' + $scope.uploadId)).on('change', handleFileSelect);
        });
	}

	return {
		restrict : "EA",
		template:'<div><div ng-show="!isLoaded" ><input type="file" id="{{uploadId}}" class="hidden"><label style="width: 100%;float: left;position: relative;height: 350px;line-height: 7; font-size: 50px;" for="{{uploadId}}" class="text-center custom-btn custom-btn-primary"><i class="icon icon-picture"></i>Subir</label></div></div>',
		scope : {
			ngModel : "=",
			uploadId : "@"
		},
		controller : ctrl,
		link : link
	}
});