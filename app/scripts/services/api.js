'use strict';

/**
 * @ngdoc service
 * @name shoplyApp.api
 * @description
 * # api
 * Service in the shoplyApp.
 */
angular.module('shoplyApp')
  .service('api', function ($http, constants) {
    this.get = function(){ var url = this.url; this.reset(); return $http.get(url); };
    this.post = function(data, header){  var url = this.url; this.reset(); return $http.post(url, data || {}, header || { headers : {'Content-Type': 'application/json'} }); };
    this.put = function(data){ var url = this.url; this.reset(); return $http.put(url, data || {}); } ;  
    this.delete = function(){ var url = this.url; this.reset(); return $http.delete(url); };
    
    this.Headers = null;

    this.add = function(comp){ this.url += comp; return this;  };
    this.headers = function(headers){ this.Headers = headers; return this;  };
    this.reset = function(){ this.url = ""; };

    this.user = function(user){if(user) this.url = constants.base_url + "user/" + user; else this.url = constants.base_url + "user/"; return this;};
    this.recover = function(){ this.url = constants.base_url + "recover/"; return this;};
    this.reset_password = function(){ this.url = constants.base_url + "reset/"; return this;};
    this.credits = function(credit){if(credit) this.url = constants.base_url + "credits/" + credit; else this.url = constants.base_url + "credits/"; return this;};
    this.payments = function(payment){if(payment) this.url = constants.base_url + "payments/" + credit; else this.url = constants.base_url + "payments/"; return this;};
    this.upload = function(){ this.url = constants.uploadURL; return this};
    this.uploadLocal = function(){ this.url = constants.base_url + "upload-local/"; return this};
    this.s3 = function(){ this.url = constants.base_url + "upload-amazon/"; return this};
    
    return this;
  });
