'use strict';

/**
 * @ngdoc function
 * @name angularClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularClientApp
 */
angular.module('angularClientApp')
// .factory('CallSoapService', ['$soap',function($soap){
//   //var baseUrl = 'http://www.cooldomain.com/SoapTest/webservicedemo.asmx';
//
//   return {
//       soap_weather: function(url, login, password, ipRest, ipSoap){
//           return $soap.post(url,'soap_call', {login: login, password: password, ip_rest: ipRest, ip_soap: ipSoap});
//       }
//   };
// }])
.controller('MainCtrl', function ($scope) {
    // CallSoapService.soap_weather('http://127.0.0.1:8080/soap_weather/wsdl', "test", "1234", "localhost", 'localhost').then(function(response){
    //   $scope.response = response;
    // });
    var initParams = {
      "login": "",
      "password": "",
      "lat": 0.0,
      "long":0.0,
      "ipRest": "",
      "ipSoap":"",
      "actionName": "",
      "endpoint":"",
      "authMethod": ""
    };
    $scope.responseValue = undefined;
    $scope.param = initParams;

    $scope.callSoap = function(){
      $scope.by_lat_lon($scope.params.login, $scope.params.password, $scope.params.lat, $scope.params.long, $scope.params.ipRest, $scope.params.ipSoap, $scope.params.actionName, $scope.params.endpoint, $scope.params.authMethod )
    }

    $scope.reset = function() {
      $scope.params = {
        "login": "",
        "password": "",
        "lat": 0.0,
        "long":0.0,
        "ipRest": "",
        "ipSoap":"",
        "actionName": "",
        "endpoint":"",
        "authMethod": ""
      };
    }
    //$scope.url = 'http://localhost:8080/soap_weather/action';

    var xmlHttpRequest;
  	$scope.getHttpRequest = function(){
  		var http_request;
  		if (window.XMLHttpRequest) { // Mozilla, Safari, ...
  			 http_request = new XMLHttpRequest();
  		}else if (window.ActiveXObject) { // IE
  			 http_request = new ActiveXObject("Microsoft.XMLHTTP");
  		 }else{
  			 alert("Your browser doesn't support to create XMLHttp Object,Some content on this page can't show.");
  			 return null;
  		}
  		 return http_request;
  	}

    $scope.initUrl = function(ipSoap, endpoint){
  		// url=http://10.33.0.26:8181/weather/action
      var url = "http://" + ipSoap + "/" +endpoint +"/action";
  		$scope.url = url
  	}

  	// web service method
  	$scope.by_lat_lon = function(/*string*/ login,/*string*/ password,/*double*/ lat,/*string*/ lon, ipRest, ipSoap, methodName, endpoint, authMethod) {
      $scope.initUrl(ipSoap, endpoint);
      var soapMess ="<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
  		"<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:WashOut\">" +
  		"<soap:Body>" +
  		"<urn:"+methodName+">"
  		soapMess += "<urn:login>"+login+"</urn:login>"
  		soapMess += "<urn:password>"+password+"</urn:password>"
  		soapMess += "<urn:lat>"+lat+"</urn:lat>"
  		soapMess += "<urn:lon>"+lon+"</urn:lon>"
  		soapMess += "<urn:authent_ip>"+ipRest+"</urn:authent_ip>"
  		soapMess += "<urn:authent_method>"+authMethod+"</urn:authent_method>"
  		soapMess +="</urn:"+methodName+">"
  		soapMess +="</soap:Body></soap:Envelope>"
      $scope.messageSOAP = soapMess;
  		xmlHttpRequest = $scope.getHttpRequest();
  		xmlHttpRequest.onreadystatechange = $scope.by_lat_lon_callback;
  		xmlHttpRequest.open("POST",$scope.url,true);
  		xmlHttpRequest.setRequestHeader("SOAPAction",methodName);
  		xmlHttpRequest.setRequestHeader("Content-Type","text/xml; charset=utf-8");
  		xmlHttpRequest.send(soapMess);
  	}

  	// this function will be called when result return from web service.
  	$scope.by_lat_lon_callback = function(){
  	// return value from web service is an xml document.
  		var rawData;
  		if (xmlHttpRequest.readyState == 4){
  			if (xmlHttpRequest.status == 200){
  				rawData = xmlHttpRequest.responseXML;
  				var resultNode = rawData.documentElement.getElementsByTagName("value")[0];
  				var resultValue = resultNode.firstChild.nodeValue
  				// Now,you can process the returnValue in function by_lat_lon_handler
  				by_lat_lon_handler(resultValue);
  			}else{
  				alert("web service response error:" + xmlHttpRequest.status + "," + xmlHttpRequest.statusText);
  			}
  		}
  	}

  	// process result value of method by_lat_lon
  	function by_lat_lon_handler(/*string*/ resultValue) {
      console.log("resultValue", resultValue);
      $scope.responseValue = resultValue;
      console.log("$scope.responseValue", $scope.responseValue);
      $scope.$apply();
  	}
    console.log("test");
  });
