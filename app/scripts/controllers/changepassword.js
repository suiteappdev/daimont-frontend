'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:ChangepasswordCtrl
 * @description
 * # ChangepasswordCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('ChangepasswordCtrl', function ($scope, sweetAlert, account, storage, $state) {
  	$scope.changePassword = function(){
        if($scope.changePasswordForm.$valid){
        	if($scope.form.data.newpwd != $scope.form.data.confirmpwd){
                 sweetAlert.swal({
                        title: "Formulario incompleto",
                        text: "Las Contraseñas no coinciden",
                        type: "error"
                    })
                 return;
        	}

        	account.usuario().password_reset(angular.extend($scope.form.data, {id : angular.fromJson(storage.get('user'))._id})).then(function(res){
        		if(res){
					           sweetAlert.swal("Cambio de clave!", "se ha cambiado correctamente", "success");
                     $storage.delete('user');
                     $storage.delete('token');
					           delete scope.form;
                     $state.go('login');
        		}
        	}, function(status){

        		if(status == 400){
                 sweetAlert.swal({
                        title: "Formulario no completado",
                        text: "Las Contraseñas no coinciden",
                        type: "error"
                    })
        		}

        		if(status == 404){
                 sweetAlert.swal({
                        title: "Formulario no completado",
                        text: "El usuario no existe",
                        type: "error"
                    })
        		}
        	})
        }else{
         sweetAlert.swal({
                title: "Formulario no completado",
                text: "Por favor rellene los campos",
                type: "error"
            })
        }
  	}
  });
