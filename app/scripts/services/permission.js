'use strict';
angular.module('shoplyApp')
  .service('permission', function ($rootScope) {
  	return {
      canView : function(id){
        var _allow = false;

        if($rootScope.user && $rootScope.user._permission && $rootScope.user.type == "EMPLOYE"){
          angular.forEach($rootScope.user._permission.data.permission, function(o){
            if(o._menu == id){
                _allow = o.access ? o.access.view : false; 
            }
          });


        }else if($rootScope.user && $rootScope.user.type == "ADMINISTRATOR"){
          _allow = true;
        }

        return  _allow; 

      },
      canViewForm : function(id){
        var _allow = false;

        if($rootScope.user && $rootScope.user._permission && $rootScope.user.type == "EMPLOYE"){
          angular.forEach($rootScope.user._permission.data.permission, function(o){
            if(o._form == id){
                _allow = o.access ? o.access.view : false; ; 
            }
          });


        }else if($rootScope.user && $rootScope.user.type == "ADMINISTRATOR"){
          _allow = true;
        }

        return  _allow; 

      },
      canCreate : function (id){
        var _allow = false;

        if($rootScope.user && $rootScope.user._permission && $rootScope.user.type == "EMPLOYE"){
          angular.forEach($rootScope.user._permission.data.permission, function(o){
            if(o._menu == id){
                _allow = o.access ? o.access.view : false;  
            }
          });


        }else if($rootScope.user && $rootScope.user.type == "ADMINISTRATOR"){
          _allow = true;
        }

        return  _allow; 
      },
      canUpdate : function(id){
        var _allow = false;

        if($rootScope.user && $rootScope.user._permission && $rootScope.user.type == "EMPLOYE"){
          angular.forEach($rootScope.user._permission.data.permission, function(o){
            if(o._menu == id){
                _allow = o.access ? o.access.view : false;  
            }
          });


        }else if($rootScope.user && $rootScope.user.type == "ADMINISTRATOR"){
          _allow = true;
        }

        return  _allow; 
      },
      canDelete : function(id){
        var _allow = false;

        if($rootScope.user && $rootScope.user._permission && $rootScope.user.type == "EMPLOYE"){
          angular.forEach($rootScope.user._permission.data.permission, function(o){
            if(o._menu == id){
                _allow = o.access ? o.access.view : false;  
            }
          });


        }else if($rootScope.user && $rootScope.user.type == "ADMINISTRATOR"){
          _allow = true;
        }

        return  _allow; 
      },
  	};
  });
