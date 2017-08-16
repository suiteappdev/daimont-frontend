'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:uploader
 * @description
 * # uploader
 */
angular.module('shoplyApp')
  .directive('uploaderDrop', ["api", "$window", "$timeout", function (api, $window, $timeout) {
  	
  	function ctrl($scope){

  	}

    return {
      restrict: 'EA',
      replace : true,
      template : '<div class="drop-box"><input type="file" name="{{selector}}" id="{{selector}}" class="hidden"><label for="{{selector}}"><span class="">{{ngModel.name || "Seleccionar o Arrastrar"}}</span><p style="color: #e66e6e;padding: 4px;background-color: whitesmoke; border-radius: 3px;font-size: smaller;" ng-show="showErrorFile"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp;{{showErrorFile}}</p></label></div>',
      scope : {
      	ngModel : '=',
      	selector : '@',
      	size : '=',
      	ext : '='
      },
      controller : ctrl,
      link: function postLink(scope, element, attrs) {
      		$timeout(function(){
				var _element = document.getElementById(attrs.selector);

				angular.element(_element).on('change', function(evt){
					scope.$apply(function(){
							scope.ngModel = evt.currentTarget.files[0];
							var _size  = parseFloat(evt.currentTarget.files[0].size / 1024 / 1024).toFixed(2);
							var _ext = evt.currentTarget.files[0].name.split(".")[1];

							if(scope.ext.indexOf(_ext) == - 1){
								scope.showErrorFile = "Este archivo no es valido";
								return;
							}

							if(_size > scope.size){
								scope.showErrorFile = "Archivo pesado! tamaño maximo " + scope.size + "MB";
								return;
							}else{
								scope.showErrorFile = false;
							}
						});

				    element.addClass('success');
				});				
      		});


			element.on('dragover', function(e) {
			    e.preventDefault();
			    e.stopPropagation();
			});

			element.on('dragenter', function(e) {
			    e.preventDefault();
			    e.stopPropagation();
			});

			element.on('drop', function(e) {
			    e.preventDefault();
			    e.stopPropagation();
			    if (e.originalEvent.dataTransfer){
			        if (e.originalEvent.dataTransfer.files.length > 0) {

			        	scope.$apply(function(){
							var _size  = parseFloat(e.originalEvent.dataTransfer.files[0].size / 1024 / 1024).toFixed(2);
							var _ext = e.originalEvent.dataTransfer.files[0].name.split(".")[1];

							if(scope.ext.indexOf(_ext) == - 1){
								scope.showErrorFile = "Este archivo no es valido";
								return;
							}

							if(_size > scope.size){
								scope.showErrorFile = "Archivo pesado! tamaño maximo " + scope.size + "MB";
								return;
							}else{
								scope.showErrorFile = false;
							}

				        	element.addClass('success');
				            scope.ngModel = e.originalEvent.dataTransfer.files[0];			        		
			        	});
			        }
			    }

			    return false;
			});
		}
	}
  }]);
