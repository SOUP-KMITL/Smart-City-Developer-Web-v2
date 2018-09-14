angular
	.module('DevelopersApp')
	.factory('userService',function($base64,$http) {
		
		function genAccessToken(user,pwd,callback){
			console.log(user+" : "+pwd);
			var response = { success : false};
            var req = {
        		method: 'PUT',
               	url: 'https://api.smartcity.kmitl.io/api/v1/users/'+user+'/token',
               	headers: {
                 'Authorization':  'Basic ' + $base64.encode(user+':'+pwd)
               }
              }
               $http(req)
                .then(function(data){
                  console.log(data);
                  response.success = true;
                  response.data = data;
                  callback(response);
                },
                function(error){
                  response.message = 'Password is incorrect.';
                  console.log(error);
                 callback(response);
                });
		}
		return {
			genAccessToken: genAccessToken
		}
	});