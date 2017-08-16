'use strict';

describe('Controller: CategoriaCtrl', function () {

  // load the controller's module
  beforeEach(module('shoplyApp'));

  var CategoriaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoriaCtrl = $controller('CategoriaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CategoriaCtrl.awesomeThings.length).toBe(3);
  });
});
