angular.module('callSoapModule', ['angularSoap'])

.factory("callSoapService", ['$soap',function($soap){
    var base_url = "http://www.cooldomain.com/SoapTest/webservicedemo.asmx";

    return {
        CreateUser: function(firstName, lastName){
            return $soap.post(base_url,"CreateUser", {firstName: firstName, lastName: lastName});
        }
    }
}])

.controller('MainCtrl', function($scope, callSoapService) {

  testService.CreateUser($scope.firstName, $scope.lastName).then(function(response){
    $scope.response = response;
  });

})
