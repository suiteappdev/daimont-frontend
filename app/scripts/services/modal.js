'use strict';

/**
 * @ngdoc service
 * @name shoplyApp.modal
 * @description
 * # modal
 * Service in the shoplyApp.
 */
angular.module('shoplyApp')
  .service('modal', ['$uibModal', function ($uibModal) {
         return {
        	showLoading : function(params, callback){
		        window.modal = $uibModal.open({
		            templateUrl: 'views/modal/loader.html',
		            size: 'sm'
		        });
        	},
        	show : function(params, onAccept, onCancel){

		        window.modal = $uibModal.open({
		            templateUrl: params.templateUrl,
		            backdrop : params.backdrop,
		            size: params.size || 'md',
		            windowClass : params.windowClass,
		            animation: false,
		            scope : params.scope,
		            controller :["$scope", function($scope){
		                $scope.ok = function(){
		                	onAccept($scope);
		                }
		                
		                $scope.cancel = function(){
		                	if(onCancel){
		                    	onCancel($scope);
		                		return;
		                	}
		                    $scope.$close();
		                }
		            } ] 
		        });

				window.modal.result.then(function(){
			          console.log("Modal Closed!!!");
		      	}, function(){

		     	 });

        	},

        	confirm : function(options, callback){
        		var _default = {
	        	   confirmButtonColor: "#DD6B55", 
	               confirmButtonText: "Si",
	               cancelButtonText: "No",
	               showCancelButton: true,
	               closeOnConfirm: false,
	               closeOnCancel: true 
        		}

                window.sweet = sweetAlert(angular.extend(_default, options), callback);
        	},

        	removeConfirm : function(options, callback){
        		
        		var _default = {
        		   title: "Está Seguro?",
                   text: "Una vez eliminado este registro, no podrá volver a usarlo.",
                   type: "warning",
	        	   confirmButtonColor: "#DD6B55", 
	               confirmButtonText: "Eliminar",
	               cancelButtonText: "Cancelar",
	               showCancelButton: true,
	               closeOnConfirm: false,
	               closeOnCancel: true 
        		}

                window.sweet = sweetAlert(angular.extend(_default, options), callback);
        	},

        	incompleteForm : function(callback){
        		   var options = {
                        confirmButtonText: "Ok",
                        showCancelButton: false,
             			confirmButtonColor: "#008086",
                        title: "Formulario no completado",
                        text: "Los campos con (*) son obligatorios",
                        type: "error"
                    };

                window.sweet = sweetAlert(options, callback);
        	}

        }
  } ] );
