'use strict';
angular.module('angularClientApp').controller('HeaderController', function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  });
