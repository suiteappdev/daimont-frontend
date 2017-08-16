'use strict';

describe('Controller: ProductosCtrl', function () {

  // load the controller's module
  beforeEach(module('shoplyApp'));

  var ProductosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductosCtrl = $controller('ProductosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductosCtrl.awesomeThings.length).toBe(3);
  });
});
