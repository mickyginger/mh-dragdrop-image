'use strict';

angular
  .module('mhDragdropImage')
  .directive('dragDropImg', ['$window', function ($window) {
    const fileReader = new $window.FileReader();

    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      template: '<div class="drag-drop-img" ng-style="background-image: url({{ base64String }})" ng-class="{ active: active }"></div>',
      link($scope, $element, attrs, ngModel) {

        $scope.active = false;

        fileReader.onload = function() {
          $scope.base64String = this.result;
          ngModel.$setViewValue(this.result);
          $scope.$apply();
        };

        $element
          .on('dragenter', function() {
            $scope.active = true;
            $scope.$apply();
          })
          .on('dragover', function(e) {
            e.preventDefault();
          })
          .on('dragleave', function() {
            $scope.active = false;
            $scope.$apply();
          })
          .on('drop', function(e) {
            e.preventDefault();
            $scope.active = false;
            const file = (e.target.files || e.dataTransfer.files)[0];
            fileReader.readAsDataURL(file);
          });
      }
    };
  }]);