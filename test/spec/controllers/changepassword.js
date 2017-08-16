'use strict';

describe('Controller: ChangepasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('shoplyApp'));

  var ChangepasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangepasswordCtrl = $controller('ChangepasswordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ChangepasswordCtrl.awesomeThings.length).toBe(3);
  });
});
