/* global describe, expect, beforeEach, it, inject */
describe('mhDragdropImage module', function () {
  var $element = null;
  var $scope = null;
  var file = new File(['foo'], 'foo.jpg', { type: 'image/jpeg' });

  beforeEach(module('mhDragdropImage'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope.$new();
    $scope.base64String = null;
    var tmpl = angular.element('<drag-drop-img ng-model="base64String"></drag-drop-img>');
    $element = $compile(tmpl)($scope);
    $element.triggerHandler({ type: 'drop', target: { files: [file] }});
    $scope.$digest();
  }));

  describe('drag-drop-img directive', function() {

    it('replaces the directive with the template', function(done) {
      setTimeout(function() {
        expect($element[0].outerHTML).to.match(/class="drag-drop-img/);
        expect($element[0].outerHTML).to.match(/^<div.*>/);
        done();
      }, 100);
    });

    it('should update ngModel', function(done) {
      setTimeout(function() {
        expect($scope.base64String).to.be.a('string');
        done();
      }, 100);
    });

    it('should convert an image into a dataURI', function(done) {
      setTimeout(function() {
        expect($scope.base64String).to.match(/^data:image\/jpeg;base64,/);
        done();
      }, 100);
    });

    it('should display the image', function(done) {
      setTimeout(function() {
        expect($element[0].style.backgroundImage).to.match(/data:image\/jpeg;base64,/);
        done();
      }, 100);
    });

    it('should update the class', function(done) {
      setTimeout(function() {
        expect($element[0].className).to.match(/has-image/);
        done();
      }, 100);
    });
  });
});
