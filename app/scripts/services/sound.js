
'use strict';

/**
 * @ngdoc service
 * @name shoplyApp.account
 * @description
 * # account
 * Service in the shoplyApp.
 */
angular.module('shoplyApp')
  .service('sounds', function () {
        return {
         	onRequest : function(){
				var audio = new Audio('statics/onRequest.mp3');
				audio.play();
         	}
        }
  });
