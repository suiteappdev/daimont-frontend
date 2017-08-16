'use strict';

angular.module('shoplyApp')
  .controller('ClientCtrl', function ($scope,$rootScope, sweetAlert, constants, $state, modal, api, storage) {
    $scope.Records = false; 
  	
    $scope.load = function(){
      api.user().get().success(function(res){
        $scope.records =  res.filter(function(_o){
          return _o.type == "CLIENT"; 
        }) || [];
        $scope.Records = true;
      });
  	}

  	$scope.create = function(){
       window.modal = modal.show({templateUrl : 'views/clientes/agregar-cliente.html', size :'md', scope: $scope, backdrop:true}, function($scope){
              switch($scope.selected) {
                  case "natural":
                    if($scope.clienteNaturalForm.$invalid){
                         modal.incompleteForm();
                        return;
                    }

                    var _data = angular.extend($scope.formPersonaNatural, {type : "CLIENT"});
                        _data.data.persona = $scope.selected;
                    api.user().post(_data).success(function(res){
                      if(res){
                        sweetAlert.swal("Registro completado.", "has registrado un nuevo vendedor.", "success");
                        $scope.$close();
                        $scope.load();
                        delete $scope.formPersonaNatural;
                      }
                    }).error(function(data, status){
                        if(status == 409){
                            sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
                        }
                     });
                      break;
                  case "juridica":
                    if($scope.clienteJuridicoForm.$invalid){
                         modal.incompleteForm();
                        return;
                    }

                    var _data = angular.extend($scope.formPersonaJuridica, { type: "CLIENT"});
                        _data.data.persona = $scope.selected;

                    api.user().post(_data).success(function(res){
                      if(res){
                        sweetAlert.swal("Registro completado.", "has registrado un nuevo vendedor.", "success");
                        $scope.$close();
                        $scope.load();
                        delete $scope.formPersonaJuridica;
                      }
                    }).error(function(data, status){
                        if(status == 409){
                            sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
                        }
                     });
                      break;
                  default:
                      modal.incompleteForm();
              }
        });
  	}

    $scope.editForm = function(){

      switch(this.record.data.persona) {
          case "natural":
            $scope.formEditPersonaNatural = angular.copy(this.record);
            $scope.selected = this.record.data.persona;
              break;
          case "juridica":
            $scope.formEditPersonaJuridica = angular.copy(this.record);
            $scope.selected = this.record.data.persona;

              break;
          default:
              modal.incompleteForm();
      }
      
     window.modal =  modal.show({templateUrl : 'views/clientes/editar_cliente.html', size :'md', scope: $scope, backdrop:true}, function($scope){
              switch($scope.selected) {
                  case "natural":
                    if($scope.clienteEditNaturalForm.$invalid){
                         modal.incompleteForm();
                        return;
                    }

                    api.user($scope.formEditPersonaNatural._id).put($scope.formEditPersonaNatural).success(function(res){
                      if(res){
                        sweetAlert.swal("Registro completado.", "has registrado un nuevo vendedor.", "success");
                        $scope.$close();
                        $scope.load();
                        delete $scope.formEditPersonaNatural;
                      }
                    }).error(function(data, status){
                        if(status == 409){
                            sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
                        }
                     });
                      break;
                  case "juridica":
                    if($scope.clienteEditJuridicoForm.$invalid){
                         modal.incompleteForm();
                        return;
                    }

                    api.user($scope.formEditPersonaJuridica._id).put($scope.formEditPersonaJuridica).success(function(res){
                      if(res){
                        sweetAlert.swal("Registro completado.", "has registrado un nuevo vendedor.", "success");
                        $scope.$close();
                        $scope.load();
                        delete $scope.formEditPersonaJuridica;
                      }
                    }).error(function(data, status){
                        if(status == 409){
                            sweetAlert.swal("No se pudo registrar.", "Este email ya esta registrado.", "error");
                        }
                    });
                      break;
                  default:
                      modal.incompleteForm();
              }
      });
    }

    $scope.delete = function(){
        var _record = this.record;

        modal.removeConfirm({closeOnConfirm : true}, 
            function(isConfirm){ 
               if (isConfirm) {
                    api.user(_record._id).delete().success(function(res){
                        $scope.records.splice($scope.records.indexOf(_record), 1);
                    });
               }
           })
    }
  });
