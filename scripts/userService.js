angular
	.module('DevelopersApp')
	.factory('userService',function( $cookies, $rootScope,$base64,$http) {
		
    function genAccessToken(user,pwd,callback){
      console.log(user+" : "+pwd);
      var response = { success : false};
            var req = {
            method: 'PUT',
                url: 'https://api.smartcity.kmitl.io/api/v1/users/'+user+'/token?json=true',
                headers: {
                 'Authorization':  'Basic ' + $base64.encode(user+':'+pwd)
               }
              }
               $http(req)
                .then(function(data){
                  $rootScope.user = JSON.parse($cookies.get('user'));
                  $rootScope.user.data.accessToken = data.data.result;
                  $http.defaults.headers.common['Authorization'] = data.data.result;
                  console.log(data);
                  response.success = true;
                  response.data = data.data.result;
                  callback(response);
                },
                function(error){
                  response.message = error.statusText;
                  console.log(error.statusText);
                 callback(response);
                });
    }
    function genTicket(id,callback){
      var response = { success : false};
            var req = {
              method: 'POST',
              url: 'https://api.smartcity.kmitl.io/api/v1/tickets?json=true',
              data:{
                  "collectionId": id
                }
              }
               $http(req)
                .then(function(data){
                  response.success = true;
                  response.data = data.data.result;
                  callback(response);
                },
                function(error){
                  response.message = error.statusText;
                  console.log(error);
                 callback(response);
                });
    }
		return {
      genTicket: genTicket,
			genAccessToken: genAccessToken
		}
	});