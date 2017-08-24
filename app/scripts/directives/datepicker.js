  angular.module('shoplyApp').directive('datePicker', function ( $timeout ) {
    return {
      replace : true,
      template : '<input type="text" placeholder="{{placeholder}}" class="form-control date-picker" data-datepicker-color="primary">',
      restrict: 'EA',
      scope : {
        ngModel : "=",
        placeholder : "@",
        required : '@'
      },
      link: function postLink(scope, element, attrs) {
        $(element[0]).datepicker({
            format: 'dd-mm-yyyy',
            autoclose:true,
             language: 'es',
            templates:{
                leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
            }
        }).on('show', function() {
                $('.datepicker').addClass('open');

                datepicker_color = $(this).data('datepicker-color');

                if( datepicker_color.length != 0){
                    $('.datepicker').addClass('datepicker-'+ datepicker_color +'');
                }

            }).on('hide', function() {
                $('.datepicker').removeClass('open');
            });;
      }
    };
  });


