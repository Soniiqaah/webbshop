/**
 * Created by soan23 on 16/12/16.
 */

//products Controller
angular.module('myShoppingCart').controller('productsController', function ($scope, $http, $log, productFactory) {

    $scope.message = 'Look! I am an products page.';


    $http({
        method: 'GET',
        url: '../products.json'
    }).then(function successCallback(response) {
        $log.debug('Response: ' + JSON.stringify(response.data));
        $scope.products = response.data;
        $log.debug($scope.products);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    // skapar en funktion (addProduct) och lägger in det jag vill pusha
    $scope.addProduct = function (product) {

        $log.debug('Valde:', product);

        productFactory.addProduct(product);
    };
});

