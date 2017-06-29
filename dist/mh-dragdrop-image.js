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
          .on('dragenter', function() {
            $scope.active = true;
            $scope.$apply();
          })
          .on('dragover', function(e) {
            e.preventDefault();
          })
          .on('drageleave', function() {
            $scope.active = false;
            $scope.$apply();
          })
          .on('drop', function(e) {
            e.preventDefault();
            const file = (e.target.files || e.dataTransfer.files)[0];
            fileReader.readAsDataURL(file);
          });
      }
    };
  }]);
})();