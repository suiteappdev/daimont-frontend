'use strict';

describe('Controller: RequestCtrl', function () {

  // load the controller's module
  beforeEach(module('shoplyApp'));

  var RequestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestCtrl = $controller('RequestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RequestCtrl.awesomeThings.length).toBe(3);
  });
});
