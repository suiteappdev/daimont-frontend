'use strict';

describe('Controller: CategorydetailCtrl', function () {

  // load the controller's module
  beforeEach(module('shoplyApp'));

  var CategorydetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategorydetailCtrl = $controller('CategorydetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CategorydetailCtrl.awesomeThings.length).toBe(3);
  });
});
