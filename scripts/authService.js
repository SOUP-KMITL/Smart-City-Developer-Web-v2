//  Authentication service. Wrapped in an IIFE to avoid global variables
//  Purpose: To handle all user authentication methods

(function() {
 
  var AuthenticationService = function($base64,$http,$location, $cookies, $rootScope, $timeout) {
      
    function getauth(){
        try{
            $rootScope.globals = JSON.parse($cookies.get('globals'));
        }
        catch{
            $rootScope.globals = {};
        }

      if($rootScope.globals.currentUser){
        return true;
      }
      else{
        return false;
      }
    }

    function getuser(){
        try{
            $rootScope.user = JSON.parse($cookies.get('user'));
        }
        catch{
            $rootScope.user = {};
        }
      return $rootScope.user;
    }

        //  Function defined for when the user login is initiate
        var Login = function (username, password, callback) {
            //  (The following code will be replaced by a real service you'd hope!)
              var response = { success : false};
              var req = {
               method: 'GET',
               url: 'https://api.smartcity.kmitl.io/api/v1/users/login',
               headers: {
                 'Authorization':  'Basic ' + $base64.encode(username+':'+password)
               }
              }
               $http(req)
                .then(function(data){
                  $cookies.putObject('user', data);
                  response.success = true;
                  response.data = data.data;
                  callback(response);
                },
                function(error){
                  response.message = 'Username or password is incorrect.';
                  console.log(error);
                 callback(response);
                });
        };
 
        //  Sets the cookie and the state to logged in
        var SetCredentials = function (username, password) {
            var authdata = $base64.encode(username+':'+password); // We shoud really encrypt this, but this is left clear case for this example :)
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; 
            $cookies.putObject('globals', $rootScope.globals);
            $location.path('/myProfile');
            
        };
 
        //  Clears the cookie and the state for the application to recognise a logged out state
        var ClearCredentials = function () {
            $rootScope.globals = {};
            $rootScope.user = {};
            $cookies.remove('globals');
            $cookies.remove('user');
            $http.defaults.headers.common.Authorization = 'Basic ';
            $location.path('/');
        };
   

    return {
      getuser: getuser,
      getauth: getauth,
      Login: Login,
      SetCredentials: SetCredentials,
      ClearCredentials: ClearCredentials
    };

  }

  //  Register the service with the application
  var module = angular.module("DevelopersApp");
  module.factory("AuthenticationService", AuthenticationService)

}());