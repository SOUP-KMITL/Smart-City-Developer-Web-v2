angular
	.module('DevelopersApp')
	.config(function($routeProvider, $locationProvider) {
	    $routeProvider
	    .when("/", {
	        templateUrl : "pages/home.html",
	        controller: "DevelopersController"
	    })
	    .when("/architecture", {
	        templateUrl : "pages/arch.html",
	        controller: "DevelopersController"
	    })
	    .when("/services", {
	        templateUrl : "pages/service.html",
	        controller: "DevelopersController"
	    })
	    .when("/services/data-exchange", {
	        templateUrl : "pages/services/dataexchange.html",
	        controller: "DevelopersController"
	    })
	    .when("/services/visualization", {
	        templateUrl : "pages/services/visualization.html",
	        controller: "DevelopersController"
	    })
	    .when("/services/city-services", {
	        templateUrl : "pages/services/cityservice.html",
	        controller: "DevelopersController"
	    })
	    .when("/services/developer-portal", {
	        templateUrl : "pages/services/developerportal.html",
	        controller: "DevelopersController"
	    })
	    .when("/services/connector", {
	        templateUrl : "pages/services/connector.html",
	        controller: "DevelopersController"
	    })
	    .when("/services/marketplace", {
	        templateUrl : "pages/services/marketplace.html",
	        controller: "DevelopersController"
	    })
	    .when("/tutorial/data-exchange", {
	        templateUrl : "pages/tutorial.html",
	        controller: "404Controller"
	    })
	    .when("/tutorial/visualization", {
	        templateUrl : "pages/tutorial.html",
	        controller: "404Controller"
	    })
	    .when("/tutorial/city-services", {
	        templateUrl : "pages/tutorial.html",
	        controller: "404Controller"
	    })
	    .when("/tutorial/developer-portal", {
	        templateUrl : "pages/tutorial.html",
	        controller: "404Controller"
	    })
	    .when("/tutorial/connector", {
	        templateUrl : "pages/tutorial.html",
	        controller: "404Controller"
	    })
	    .when("/tutorial/marketplace", {
	        templateUrl : "pages/tutorial.html",
	        controller: "404Controller"
	    })
	    // .when("/tutorial/data-exchange", {
	    //     templateUrl : "pages/tutorial/dataexchange.html",
	    //     controller: "DevelopersController"
	    // })
	    // .when("/tutorial/visualization", {
	    //     templateUrl : "pages/tutorial/visualization.html",
	    //     controller: "DevelopersController"
	    // })
	    // .when("/tutorial/city-services", {
	    //     templateUrl : "pages/tutorial/cityservice.html",
	    //     controller: "DevelopersController"
	    // })
	    // .when("/tutorial/developer-portal", {
	    //     templateUrl : "pages/tutorial/developerportal.html",
	    //     controller: "DevelopersController"
	    // })
	    // .when("/tutorial/connector", {
	    //     templateUrl : "pages/tutorial/connector.html",
	    //     controller: "DevelopersController"
	    // })
	    // .when("/tutorial/marketplace", {
	    //     templateUrl : "pages/tutorial/marketplace.html",
	    //     controller: "DevelopersController"
	    // })
	    .when("/marketplace", {
	        templateUrl : "pages/marketplace.html",
	        controller: "marketplaceController"
	    })
	    .when("/marketplace/city-service", {
	        templateUrl : "pages/marketplace-cityservice.html",
	        controller: "marketplaceCityServiceController"
	    })
	    .when("/marketplace/collection", {
	        templateUrl : "pages/marketplace-collection.html",
	        controller: "marketplaceCollectionController"
	    })
	    .when("/about-us", {
	        templateUrl : "pages/about-us.html",
	        controller: "DevelopersController"
	    })
	    .when("/marketplace/city-service/:id", {
	        templateUrl : "pages/service-detail.html",
	        controller: "ServiceDetailController"
	    })
	    .when("/marketplace/collection/:id", {
	        templateUrl : "pages/collection-detail.html",
	        controller: "CollectionDetailController"
	    })
	    .when("/myProfile", {
	        templateUrl : "pages/myprofile/myProfile.html",
	        controller: "myProfileController"
	    })
	    .when("/myProfile/city-service", {
	        templateUrl : "pages/myprofile/my-cityservice.html",
	        controller: "myCityServiceController"
	    })
	    .when("/myProfile/create/city-service", {
	        templateUrl : "pages/create/create-service-a.html",
	        controller: "createCityServiceController"
	    })
	    .when("/myProfile/edit/city-service/:id", {
	        templateUrl : "pages/create/create-service-b.html",
	        controller: "editCityServiceController"
	    })
	    .when("/myProfile/create/collection", {
	        templateUrl : "pages/create/create-collection-a.html",
	        controller: "createCollectionController"
	    })
	    .when("/myProfile/edit/collection/:id", {
	        templateUrl : "pages/create/create-collection-b.html",
	        controller: "editCollectionController"
	    })
	    .when("/myProfile/city-service/:id", {
	        templateUrl : "pages/myprofile/my-cityservice-detail.html",
	        controller: "myCityServiceDetailController"
	    })
	    .when("/myProfile/collection/:id", {
	        // templateUrl : "pages/home.html",
	        templateUrl : "pages/myprofile/my-collection-detail.html",
	        // controller: "DevelopersController"
	        controller: "myCollectionDetailController"
	    })
	    .when("/myProfile/collection", {
	        templateUrl : "pages/myprofile/my-collection.html",
	        controller: "myCollectionController"
	    })
	    .otherwise( {
	        templateUrl : "pages/home.html",
	        controller: "DevelopersController"
	    });
	    $locationProvider.html5Mode(true);
	});