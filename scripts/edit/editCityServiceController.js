angular
	.module('DevelopersApp')
	.controller('editCityServiceController',function($routeParams,$uibModal,$anchorScroll, uploadService,$location,$scope,$http,DevelopersFactory,AuthenticationService){
	    $scope.$watch('file', function(newfile, oldfile) {
	      if(angular.equals(newfile, oldfile) ){
	        return;
	      }
	      uploadService.upload($routeParams.id,newfile).then(function(res){
	        // DO SOMETHING WITH THE RESULT!
	        console.log("result", res);
	      })
	    });

		
        $scope.goto = function(url){
            $location.path(url);
        }
		$scope.auth = AuthenticationService.getauth();
		if(AuthenticationService.getauth()){
			$scope.user = AuthenticationService.getuser().data;
		}
        else{
            $scope.goto('/');
        }
		$scope.logout = function(){
			$scope.auth = false;
			AuthenticationService.ClearCredentials();
		}

		
	});