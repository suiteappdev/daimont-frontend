  angular.module('shoplyApp').directive('dateField', function ( $timeout ) {
    function ctrl($scope, api, modal, $rootScope){

    }

    return {
      replace:true,
      template: '<input data-theme="datedrop-custom-theme"  data-modal="true" data-large-default="true" data-large-mode="true" data-format="d-m-Y" type="text"  id="fecha" data-lang="es" class="form-control" placeholder="Cuando Pagaste?" aria-describedby="basic-addon2" enableread>',
      restrict: 'EA',
      scope : {
        ngModel : "=",
        placeholder : "@",
        modal : '@',
        required : '@'
      },
      controller :ctrl,
      link: function postLink(scope, element, attrs) {
        $timeout(function(){
            $(element[0]).dateDropper();
        });
      }
    };
  });



angular.module('shoplyApp').directive('dateInline', function ( $timeout ) {
    function ctrl($scope, $rootScope){
    $scope.years = [];
    var myDate = new Date();
    $scope.days = [];

    var year = myDate.getFullYear();
    
    for (var i = 1; i < 32; i++) {
        $scope.days.push({ day : i });
    }; 

    $scope.$watch('ngModel', function(n, o){
      if(n){
          $scope.date = n;
      }
    });

    $scope.$watch('date.month', function(n, o){
      if(n){
          if(n == 'Enero' || n == 'Marzo' || n == 'Mayo' || n == 'Julio' || n == 'Agosto' || n == 'Octubre' || n == 'Diciembre'){
             
              for (var i = 1; i < 32; i++) {
                  $scope.days.push({ day : i });
              };
          }else if(n == 'Abril' || n == 'Junio' || n == 'Septiembre' || n == 'Noviembre'){
              for (var i = 1; i < 31; i++) {
                  $scope.days.push({ day : i });
              };
          }else if(n == 'Febrero'){
              for (var i = 1; i < 30; i++) {
                  $scope.days.push({ day : i });
              }; 
          }

          $scope.ngModel = $scope.date;        
      }

    });


    $scope.months = [
        { name:"Enero" , days:31},
        { name:"Febrero" , days:29},
        { name:"Marzo" , days:31},
        { name:"Abril" , days:30},
        { name:"Mayo" , days:31},
        { name:"Junio" , days:30},
        { name:"Julio" , days:31},
        { name:"Agosto" , days:31},
        { name:"Septiembre" , days:30},
        { name:"Octubre" , days:31},
        { name:"Noviembre" , days:30},
        { name:"Diciembre" , days:31}
    ];

      for(var i = $scope.initial; i < year+1; i++){
          $scope.years.push({ year :i})
      }
    }

    return {
      replace:true,
      templateUrl: 'views/utils/date-inline.html',
      restrict: 'EA',
      scope : {
        ngModel : "=",
        initial : "=",
        placeholder : "@",
        required : '@'
      },
      controller :ctrl,
      link: function postLink(scope, element, attrs) {

      }
    };
});


   

  