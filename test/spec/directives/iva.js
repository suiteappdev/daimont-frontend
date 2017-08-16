'use strict';

describe('Directive: iva', function () {

  // load the directive's module
  beforeEach(module('shoplyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<iva></iva>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the iva directive');
  }));
});
