'use strict';

describe('Controller: TransportadorCtrl', function () {

  // load the controller's module
  beforeEach(module('shoplyApp'));

  var TransportadorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransportadorCtrl = $controller('TransportadorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransportadorCtrl.awesomeThings.length).toBe(3);
  });
});
