angular
	.module('DevelopersApp')
	.run(function($rootScope, $location, $cookies, $http) {
 // keep user logged in after page refresh
        console.log("app.run");
        try{
            $rootScope.globals = JSON.parse($cookies.get('globals'));
        }
        catch{
            $rootScope.globals = {};
        }

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
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