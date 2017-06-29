angular
  .module('mhDragdropImage')
  .directive('dragDropImg', dragDropImg);

dragDropImg.inject = ['$window'];
function dragDropImg($window) {
  const fileReader = new $window.FileReader();

  return {
    restrict: 'E',
    require: 'ngModel',
    template: '<div class="drag-drop-img" ng-class="{ active: active }"><img ng-src="{{ ngModel }}"></div>',
    scope: {
      active: '='
    },
    link($scope, $element, attrs, ngModel) {

      $scope.active = false;

      fileReader.onload = function() {
        ngModel.$setViewValue(this.result);
      };

      $element
        .on('dragenter', () => {
          $scope.active = true;
          $scope.$apply();
        })
        .on('dragover', (e) => {
          e.preventDefault();
        })
        .on('drageleave', () => {
          $scope.active = false;
          $scope.$apply();
        })
        .on('drop', (e) => {
          e.preventDefault();
          const file = (e.target.files || e.dataTransfer.files)[0];
          fileReader.readAsDataURL(file);
        });
    }
  };
}