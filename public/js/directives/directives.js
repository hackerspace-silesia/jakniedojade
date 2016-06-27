angular.module('app')
  .directive('trackPictogram', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/track.html'
    };
  });
