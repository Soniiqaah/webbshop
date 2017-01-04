/**
 * Created by soan23 on 16/12/16.
 */
var myShoppingCart = angular.module('myShoppingCart', ['ngRoute']);

// konfigurerar mina routes
myShoppingCart.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        //route for the home page
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })

        // route for the products page
        .when('/products', {
            templateUrl: 'products.html',
            controller: 'productsController'
        })

        // route for the shoppinglist page
        .when('/shoppinglist', {
            templateUrl: 'shoppinglist.html',
            controller: 'shoppinglistController'
        })
        // route for the thank you page
        .when('/thankyou', {
            templateUrl: 'thankyou.html',
            controller: 'thankyouController'
        })


});
