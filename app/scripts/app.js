'use strict';

/**
 * @ngdoc overview
 * @name shoplyApp
 * @description
 * # shoplyApp
 *
 * Main module of the application.
 */
angular
  .module('shoplyApp', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase',
    'selectize',
    'angularUtils.directives.dirPagination',
    'ngImgCrop',
    'angular-preload-image',
    'jkuri.datepicker',
    'vcRecaptcha',
    'ui.map',
    'facebook'
  ])
  .config(function ($stateProvider, $httpProvider, constants, $urlRouterProvider, FacebookProvider, paginationTemplateProvider, $locationProvider) {
        FacebookProvider.init('448351572192242');
        paginationTemplateProvider.setPath('views/system-utils/pagination.tpl.html');
        $httpProvider.interceptors.push(function($injector, $q, sweetAlert, storage) {
        var rootScope = $injector.get('$rootScope');

        return {
            'request': function(config) {
                
                $httpProvider.defaults.withCredentials = false;
                
                if(window.localStorage.token){
                   $httpProvider.defaults.headers.common['x-daimont-auth'] =  window.localStorage.token ;
                   $httpProvider.defaults.headers.common['x-daimont-user'] =  window.localStorage.uid || null  ; // common
                 }

                 if(window.localStorage.access_token){
                    $httpProvider.defaults.headers.common['access-token'] =  window.localStorage.access_token;
                    $httpProvider.defaults.headers.common['x-daimont-user'] =  window.localStorage.uid || null  ; // common
                 }
                 
                console.log(config, 'request')
                
                if(config.method == 'POST'){
                    config.data.metadata = config.data.metadata || {}
                    config.data.metadata._author = window.localStorage.uid || null;
                    
                    if(window.localStorage.access_token){
                        config.data.metadata._provider = 'FACEBOOK'; 
                    } 
                  }
                /*for (var x in config.data) {
                    if (typeof config.data[x] === 'boolean') {
                        config.data[x] += '';
                    }
                }*/

                return config || $q.when(config);
            },
            'response': function(response) {
                return response;

            },
            'responseError': function(rejection) {
                 switch(rejection.status){

                    case 401:
                       window.localStorage.clear();
                       delete rootScope.isLogged;
                       delete rootScope.user;
                      return $q.reject(rejection);
                    break;

                    default:
                      return $q.reject(rejection);
                    break;
                 }
                
                return $q.reject(rejection);
            }
        };
    });

      $urlRouterProvider.otherwise("/");
      $stateProvider
          .state('home', {
              url: '/',
              templateUrl: 'views/home/home.html',
              data: {
                pageTitle: 'Inicio'
              }
          })
          .state('empezar', {
              url: '/empezar',
              templateUrl: 'views/empezar/empezar.html',
              params: {
                      credit: null
              },
              data: {
                pageTitle: 'Empezar'
              }
          })
          .state('home.continuar', {
              url: 'home/continuar',
              templateUrl: 'views/forms/login.html',
              params: {
                credit: null
              },
              data: {
                pageTitle: 'Ingresar y Continuar'
              }
          })
          .state('activation', {
              url: 'activation/:activation',
              templateUrl: 'views/activation/activation.html',
              data: {
                pageTitle: 'Activar Cuenta'
              }
          })
          .state('home.sms', {
              url: 'home/sms',
              templateUrl: 'views/forms/sms-checking.html',
              data: {
                pageTitle: 'Verificando...'
              }
          })
          .state('about', {
              url: '/acercade',
              templateUrl: 'views/aboutus/aboutus.html',
              data: {
                pageTitle: 'Que es Daimont?'
              }
          })
          .state('how', {
              url: '/como-empezar',
              templateUrl: 'views/how-start/how-start.html',
              data: {
                pageTitle: 'Como solicitar un credito?'
              }
          })
          .state('faq', {
              url: '/preguntas-frecuentes',
              templateUrl: 'views/faq/faq.html',
              data: {
                pageTitle: 'FAQ'
              }
          })
          .state('contact', {
              url: '/contacto',
              templateUrl: 'views/contact/contact.html',
              data: {
                pageTitle: 'Contactanos'
              }
          })
          .state('terms', {
              url: '/terminos-condiciones',
              templateUrl: 'views/terms/terms.html',
              data: {
                pageTitle: 'Terminos y condiciones'
              }
          })
          .state('login', {
              url: '/login/:token',
              templateUrl: 'views/login/login.html',
              params : {
                mailed : null,
                token : null
              },
              data: {
                pageTitle: 'Entrar'
              } 
          })
          .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup/signup.html',
                controller:'signupCtrl',
                data: {
                  pageTitle: 'Registrarse'
                }
          })
          .state('profile', {
                url: '/perfil',
                access: { requiredAuthentication: false },
                templateUrl: 'views/profile/profile.html',
                controller:'profileCtrl',
                params: {
                  credit:null,
                  token: null,
                  contract: null
                },  
                data: {
                  pageTitle: 'Perfil'
                }
          })
          .state('contract', {
                url: '/nuevo-contrato/:credit',
                access: { requiredAuthentication: false },
                templateUrl: 'views/contract/contract.html',
                params: {
                  credit: null,
                },  
                data: {
                  pageTitle: 'Firmar contrato'
                }
          })
          .state('profile.basic', {
                url: '/update/basic',
                access: { requiredAuthentication: false },
                templateUrl: 'views/profile/basic_info.html',
                controller:'profileCtrl',
                data: {
                  pageTitle: 'Información Basica'
                }
          })
          .state('profile.location', {
                url: '/update/location',
                access: { requiredAuthentication: false },
                templateUrl: 'views/profile/location_info.html',
                controller:'profileCtrl',
                data: {
                  pageTitle: 'Información residencial'
                }
          })
          .state('profile.finance', {
                url: '/update/finance',
                access: { requiredAuthentication: false },
                templateUrl: 'views/profile/finance_info.html',
                controller:'profileCtrl',
                data: {
                  pageTitle: 'Información Financiera'
                }
          })
          .state('profile.bank', {
                url: '/update/bank',
                access: { requiredAuthentication: false },
                templateUrl: 'views/profile/bank_info.html',
                controller:'profileCtrl',
                data: {
                  pageTitle: 'Información Bancaria'
                }
          })
          .state('recover', {
                url: '/recover',
                templateUrl: 'views/recover/recover.html',
                data: {
                  pageTitle: 'Recuperar clave'
                }
          })
          .state('reset', {
                url: '/account/reset/:token',
                templateUrl: 'views/reset/reset.html',
                data: {
                  pageTitle: 'Cambiar clave'
                }
          })
          .state('dashboard.change-password', {
                url: '/account/change-password',
                access: { requiredAuthentication: false },
                templateUrl: 'views/reset/change_password.html',
                data: {
                  pageTitle: 'Cambiar clave'
                }
          })
          .state('dashboard.new_credit', {
                url: '/nuevo-credito',
                access: { requiredAuthentication: true },
                templateUrl: 'views/credits/new_credit.html',
                data: {
                  pageTitle: 'Nuevo Credito'
                }
          })
          .state('dashboard.historial', {
                url: '/historial',
                access: { requiredAuthentication: true },
                templateUrl: 'views/historial/historial.html',
                data: {
                  pageTitle: 'historial de Prestamos'
                }
          })
          .state('dashboard.profile', {
                url: '/perfil',
                access: { requiredAuthentication: true },
                templateUrl: 'views/profile/profile.html',
                data: {
                  pageTitle: 'Actualizar Perfil'
                }
          })
          .state('detail', {
                url: '/detail/:credit',
                access: { requiredAuthentication: true },
                templateUrl: 'views/credits/credit_detail.html',
                params: {
                  credit: null
                },        
                data: {
                  pageTitle: 'Detalle del credito'
                }
          })
          .state('administrators', {
                url: '/administrators',
                access: { requiredAuthentication: true },
                templateUrl: 'views/administrators/administrators.html',
                data: {
                  pageTitle: 'Empleados'
                }
          })
          .state('plans', {
                url: '/planes',
                access: { requiredAuthentication: true },
                templateUrl: 'views/plan/planes.html',
                data: {
                  pageTitle: 'Planes'
                }
          })
          .state('payments-detail', {
                url: '/payments/:payment',
                access: { requiredAuthentication: true },
                templateUrl: 'views/payments/payments_detail.html',
                params: {
                  payment: null
                },
                data: {
                  pageTitle: 'Detalle del pago'
                }
          })
          .state('payments', {
                url: '/payments',
                access: { requiredAuthentication: true },
                templateUrl: 'views/payments/payments.html',
                params: {
                  payment: null
                },
                data: {
                  pageTitle: 'Pagos'
                }
          })
          .state('credits', {
                url: '/credits',
                access: { requiredAuthentication: true },
                templateUrl: 'views/credits/credits.html',
                data: {
                  pageTitle: 'Creditos'
                }
          })
          .state('dashboard', {
                url: '/dashboard',
                access: { requiredAuthentication: true },
                templateUrl: 'views/dashboard/dashboard.html',
                params: {
                  signed: null
                },
                data: {
                  pageTitle: 'Administración'
                }
          });
  }).run(["$rootScope", "constants", "storage", "$state","sounds", "api", "$window", "$http", function($rootScope, constants, storage, $state, sounds, api, $window, $http){
        $rootScope.currency = constants.currency;
        $rootScope.base = constants.uploadFilesUrl;
        $rootScope.user = angular.fromJson(storage.get('user'));
        $rootScope.isLogged = storage.get('access_token') || storage.get('token')
        $rootScope.state = $state;
        $rootScope.online = navigator.onLine;

        $http.get('https://freegeoip.net/json/').success(function(res){
            $rootScope.client_metadata = res || {};
        });


        $window.addEventListener("offline", function() {
          $rootScope.$apply(function() {
            $rootScope.online = false;
          });
        }, false);

        $window.addEventListener("online", function() {
          $rootScope.$apply(function() {
            $rootScope.online = true;
          });
        }, false);


        /*window.socket = new io(constants.socket);

        window.socket.on("connect", function(){
            if($rootScope.user && $rootScope.user._company){
                window.socket.emit("_company", $rootScope.user._company._id);
            }
        });

        window.socket.on('request', function(data){
          if(window.location.hash.match("dashboard")){
              toastr.options.onclick = function(){
                $state.go('dashboard.detalle_pedido', {pedido:data._id});
              };

              toastr.success('ha llegado un nuevo pedido', {timeOut: 10000});

              sounds.onRequest();

              api.pedido(data._id).get().success(function(res){
                  $rootScope.$emit("incoming_request", res);
              });            
          }
        });*/

      $rootScope.$on('$stateChangeStart', function(event, nextRoute, toParams, fromState, fromParams){
            console.log("nextRoute", nextRoute);

            if(nextRoute.name  == 'credits' || nextRoute.name  == 'payments' || nextRoute.name  == 'payments-detail' || nextRoute.name  == 'detail' || nextRoute.name == 'administrators' && $rootScope.user.type == 'CLIENT'){
                  event.preventDefault();
            }

            if(window.modal){
              window.modal.close();
            }
            
            if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !storage.get('token') && !storage.get('access_token')) {
                  event.preventDefault();
                  $state.transitionTo('login');
            }
      });
  }]);
