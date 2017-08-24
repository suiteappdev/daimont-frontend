'use strict';

angular.module('shoplyApp')
  .directive('banksField', function () {
  	function ctrl($scope, api, modal, $rootScope){
        $scope.records = [
          {name : 'Bancolombia.', img : 'images/bancolombia.png', account:'11111111', owner:'Daimont.' },
          {name : 'Davivienda', img : 'images/davivienda.png', account:'2222222', owner:'luis fernando alvarez'  },
          {name : 'Banco BBVA.', img : 'images/bbva.png', account:'333333333', owner:'luis fernando alvarez'  },
          {name : 'Banco de Bogota', img : 'images/bogota.png', account:'44444444', owner:'luis fernando alvarez'  },
          {name : 'Banco de Occidente', img : 'images/occidente.png', account:'5555555', owner:'luis fernando alvarez'  },
          {name : 'Banco Av Villas.', img : 'images/avvillas.png', account:'666666666', owner:'luis fernando alvarez'  },
          {name : 'Banco Popular', img : 'images/popular.png', account:'7777777', owner:'luis fernando alvarez'  }
        ]

        $scope.myConfig = {
          noResultText :'aun no tenemos registrado este banco.',
          create:false,
          valueField: $scope.key,
          labelField: $scope.label,
          placeholder: $scope.placeholder || 'Bancos',
          maxItems: 1,
          searchField : $scope.searchby || 'name',
          maxOptions : 8,
          openOnFocus : true,
          selectOnTab : true,
          setFocus : $scope.setFocus || false,
          render: {
                option: function(item, escape) {
                    if(item.img){
                      return '<div><img class="bank-dropdown-items" src="'+item.img+'" />' +
                           '<span class="bank-dropdown-value">'+escape(item.name)+'</span></div>'
                    }
              }
          },

          onItemAdd : function(value, $item){
            angular.forEach($scope.records, function(v, k){
              if(v[$scope.key] == value){
                $scope.setObject = $scope.records[k];
                return;
              }
            });
          }
        };

  	 };
      
    return {
      template: '<selectize config="myConfig" options="records" ng-model="ngModel"></selectize>',
      restrict: 'EA',
      scope : {
      	ngModel : "=",
        setObject:"=",
        setFocus : "=",
        key : "@",
        label : "@",
        searchby:"=",
        placeholder:"@"
      },
      controller :ctrl,
      link: function postLink(scope, element, attrs) {
      
      }
    };
  });