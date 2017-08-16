angular.module('shoplyApp').filter('moment', function (){
  return function (input, momentFn) {
    var args = Array.prototype.slice.call(arguments, 2),
        momentObj = moment(input);
    return momentObj[momentFn].apply(momentObj, args);
  };
});