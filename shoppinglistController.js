/**
 * Created by soan23 on 16/12/16.
 */

// shopping Controller
angular.module('myShoppingCart').controller('shoppinglistController', function ($scope, $log, productFactory) {
    $scope.message = 'my shoppinglist';

// hämtar products från firebase
    productFactory.getPhonesFromFirebase()
        .then(function (data) {
            $log.debug('asd', data);
            $scope.selectedProducts = data;
            $scope.$apply();
        });

    $scope.deleteProduct = function (product) {

        $log.debug('Delete:', product);

        productFactory.deleteProduct(product.id);

        //Uppdatera listan med produkter
        productFactory.getPhonesFromFirebase()
            .then(function (data) {
                $log.debug('asd', data);
                $scope.selectedProducts = data;
                $scope.$apply();
            });
    };

    $scope.decreaseQuantity = function (product) {
        productFactory.decreaseQuantity(product);
    }

    $scope.increaseQuantity = function (product) {
        productFactory.increaseQuantity(product);
    }

    $scope.clearBag = function () {

        for (var i = 0; i < $scope.selectedProducts.length; i++) {
            var produkten = $scope.selectedProducts[i];

            productFactory.deleteProduct(produkten.id);
        }

        //Uppdatera listan med produkter
        productFactory.getPhonesFromFirebase()
            .then(function (data) {
                $log.debug('asd', data);
                $scope.selectedProducts = data;
                $scope.$apply();
            });
    }


});