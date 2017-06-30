'use strict';

angular
  .module('mhDragdropImage')
  .directive('dragDropImg', ['$window', function ($window) {

    angular.element(document.querySelector('head')).prepend(`<style>
      .drag-drop-img{background-size:cover;background-repeat:no-repeat;background-position:center;background-color:#ccc;height:250px;width:250px;text-align:center;position:relative}
      .drag-drop-img:before{content:'choose a file or drag it here';position:absolute;top:50%;left:50%;transform:translate(-50%, -60%);font-family:sans-serif;font-weight:bold;color:white;text-shadow:0 2px 2px rgba(0,0,0,0.6)}
      .drag-drop-img.active{opacity:0.5}
      .drag-drop-img.active:before{display:none}
    </style>`);

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
          })
          .on('click', function() {
            $fileInput[0].click();
          });

        $fileInput.on('change', (e) => {
          $scope.active = false;
          const file = (e.target.files || e.dataTransfer.files)[0];
          fileReader.readAsDataURL(file);
        });
      }
    };
  }]);