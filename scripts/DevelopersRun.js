angular
	.module('DevelopersApp')
	.run(function(AuthenticationService,$rootScope, $location, $cookies, $http) {
 // keep user logged in after page refresh
        console.log("app.run");
        try{
            $rootScope.globals = JSON.parse($cookies.get('globals'));
        }
        catch{
            $rootScope.globals = {};
        }

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = AuthenticationService.getuser().data.accessToken;; 
        }


 /*
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
 */
   });