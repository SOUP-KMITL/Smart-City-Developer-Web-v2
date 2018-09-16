angular
	.module('DevelopersApp')
	.controller('ManageAccessControlController',function($uibModalInstance,$routeParams,$route,$location,$scope,$http,$uibModal){
		
		var req = {
			method: 'GET',
			url: 'https://api.smartcity.kmitl.io/api/v1/accesscontrol?collectionId='+$routeParams.id
		}
    	$http(req)
		.then(function(data){
			console.log(data);
			$scope.users = data.data;
		},function(error){
			$scope.users = [];
		});

		$scope.delete = function(name,index){
			var req = {
				method: 'DELETE',
				url: 'https://api.smartcity.kmitl.io/api/v1/accesscontrol',
				data: {
				  "userName": name,
				  "collectionId": $routeParams.id
				},
				headers:{
					"accept" : "application/json",
					"Content-Type": "application/json"
				}
			}
			$http(req)
			.then(function(data){
				console.log(data);
				$scope.users.splice(index, 1);
				$scope.error = false;
			},function(error){
				console.log(error);
				$scope.error = error.statusText;
			});
		}

		$scope.addClick = function(name,role){
			var req = {
				method: 'PUT',
				url: 'https://api.smartcity.kmitl.io/api/v1/accesscontrol',
				data: {
					"userName": name,
	  				"collectionId": $routeParams.id,
					"role": role
				}
			}
			$http(req)
			.then(function(data){
				console.log(data);
				$scope.users.push({"user_name":name,"role":role});
				$scope.add.name = "";
				$scope.add.role = "";
				$scope.error = false;
			},function(error){
				$scope.error = error.statusText;
			});
		}
		$scope.close = function(){
          	$uibModalInstance.close();
          	$route.reload();
		}

		$scope.goto = function(url){
			$location.path(url);
		}
		
	});

