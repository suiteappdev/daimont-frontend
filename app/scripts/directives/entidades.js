'use strict';

/**
 * @ngdoc directive
 * @name shoplyApp.directive:estadoProducto
 * @description
 * # estadoProducto
 */
angular.module('shoplyApp')
  .directive('entidadField', function () {
  	function ctrl($scope , constants) {
    		$scope.records = [
          { text :"Productos", value:"_product" },
          { text :"Pedidos", value:"_request"   },
          { text :"Facturas", value:"_invoice"  },
          { text :"Arqueos", value:"_tonnage"   },
          { text :"Bodega", value:"_grocery"   },
          { text :"Entradas", value:"_inputs"   },
          { text :"Salidas", value:"_outputs"   },
          { text :"Producciones", value:"_productions"   },
          { text :"Lotes", value:"_lotes"   }
        ]; 
  		
  		$scope.myConfig = {
    		  valueField: 'value',
    		  labelField: 'text',
    		  placeholder: 'Entidad',
    		  maxItems: 1,
          onItemAdd : function(value, $item){
          angular.forEach($scope.records, function(v, k){
            if(v.value == value){
              $scope.setObject = $scope.records[k];
              return;
            }
          });

        } 
  		};
  	}

    return {
      template: '<selectize config="myConfig" options="records" ng-model="ngModel"></selectize>',
      restrict: 'E',
      scope : {
      	ngModel : "=",
        setObject : "="
      },
      controller : ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
  });