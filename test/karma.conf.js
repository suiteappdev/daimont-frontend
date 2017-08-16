// Karma configuration
// Generated on 2016-03-18

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/sweetalert/dist/sweetalert.min.js',
      'bower_components/angularUtils-pagination/dirPagination.js',
      'bower_components/toastr/toastr.js',
      'bower_components/cropperjs/dist/cropper.js',
      'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
      'bower_components/moment/min/moment.min.js',
      'bower_components/moment/locale/es.js',
      'bower_components/ngDatepicker/src/js/ngDatepicker.js',
      'bower_components/iCheck/icheck.min.js',
      'bower_components/sifter/sifter.js',
      'bower_components/microplugin/src/microplugin.js',
      'bower_components/selectize/dist/js/selectize.js',
      'bower_components/angular-selectize2/dist/angular-selectize.js',
      'bower_components/angular-recaptcha/release/angular-recaptcha.js',
      'bower_components/angular-preload-image/angular-preload-image.js',
      'bower_components/angular-ui-utils/ui-utils.js',
      'bower_components/angular-ui-map/ui-map.js',
      'bower_components/angular-facebook/lib/angular-facebook.js',
      'bower_components/nouislider/distribute/nouislider.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/tether/dist/js/tether.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/Datedropper3/datedropper.min.js',
      'bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
      'bower_components/angular-i18n/angular-locale_es-co.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
