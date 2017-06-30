/*!
 * See LICENSE in this repository for license information
 */
(function(){
'use strict';

angular
  .module('mhDragdropImage', []);

'use strict';

angular
  .module('mhDragdropImage')
  .directive('dragDropImg', ['$window', function ($window) {

    angular.element(document.querySelector('head')).prepend('<link rel="stylesheet" href="/css/drag-drop-img.css">');

    const fileReader = new $window.FileReader();
    const $fileInput = angular.element('<input type="file">');

    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      template: '<div class="drag-drop-img" ng-class="{ active: active }"></div>',
      link($scope, $element, attrs, ngModel) {

        $scope.active = false;

        fileReader.onload = function() {
          $element[0].style.backgroundImage = `url(${this.result})`;
          $scope.active = true;
          ngModel.$setViewValue(this.result);
          $scope.$apply();
        };

        $element
          .on('dragenter', function() {
            $element[0].style.opacity = 0.5;
            $scope.active = true;
            $scope.$apply();
          })
          .on('dragover', function(e) {
            e.preventDefault();
          })
          .on('dragleave', function() {
            $element[0].style.opacity = 1;
            $scope.active = false;
            $scope.$apply();
          })
          .on('drop', function(e) {
            e.preventDefault();
            $element[0].style.opacity = 1;
            $scope.active = false;
            const file = (e.target.files || e.dataTransfer.files)[0];
            fileReader.readAsDataURL(file);
          })
          .on('click', function() {
            $fileInput[0].click();
          });

        $fileInput.on('change', (e) => {
          $element[0].style.opacity = 1;
          $scope.active = false;
          const file = (e.target.files || e.dataTransfer.files)[0];
          fileReader.readAsDataURL(file);
        });
      }
    };
  }]);
})();