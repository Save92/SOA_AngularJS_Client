'use strict'
angular.module('angularClientApp').directive('prettyprint', function() {
    return {
        restrict: 'C',
        link: function postLink(scope, element, attrs) {

          element.text(vkbeautify.xml(scope.messageSOAP, 4));
              element.text(vkbeautify.xml(scope.responseValue, 4));
        }
    };
});
