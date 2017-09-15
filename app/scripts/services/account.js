'use strict';

/**
 * @ngdoc service
 * @name shoplyApp.account
 * @description
 * # account
 * Service in the shoplyApp.
 */
angular.module('shoplyApp')
  .service('account', function ($q, constants, $http) {
    this.usuario = function(){
        return {
          ingresar : function(data){
              var async = $q.defer();

                $http.post(constants.base_url + 'login', data)
                .success(function(data, status, headers, config) {
                    async.resolve(data);
                  })
                .error(function(data, status, headers, config) {
                    var response = {
                      data : data,
                      status : status,
                      headers : headers,
                      config : config
                    }

                    async.reject(response);
                  });

              return async.promise;
          },

          register : function(data){
              var async = $q.defer();

                $http.post(constants.base_url + 'user/client', data)
                .success(function(data, status, headers, config) {
                    async.resolve(data);
                    
                  })
                .error(function(data, status, headers, config) {
                  var response = {
                      data : data,
                      status : status,
                      headers : headers,
                      config : config
                    }
                    async.reject(response);
                  });

              return async.promise;
          },

          password_reset : function(data){
              var async = $q.defer();

                $http.post(constants.base_url + 'password-reset/', data)
                .success(function(data, status, headers, config) {
                    async.resolve(data);
                    
                  })
                .error(function(data, status, headers, config) {
                    async.reject(status);
                  });

              return async.promise;
          },


          salir : function(){
            if(storage.get('token')){
               storage.delete('token');
               storage.delete('user');
               window.localStorage.clear();
               window.location = '#/login';
            }
          }
        }
    }
    return this;
  });
