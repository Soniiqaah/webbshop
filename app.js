// script.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
/*var myShoppingCart = angular.module('myShoppingCart', ['ngRoute']);

// konfigurerar mina routes
myShoppingCart.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: 'html/home.html',
            controller: 'homeController'
        })
        //route for the home page
        .when('/home', {
            templateUrl: 'html/home.html',
            controller: 'homeController'
        })

        // route for the products page
        .when('/products', {
            templateUrl: 'html/products.html',
            controller: 'productsController'
        })

        // route for the shoppinglist page
        .when('/shoppinglist', {
            templateUrl: 'html/shoppinglist.html',
            controller: 'shoppinglistController'
        })
        // route for the thank you page
        .when('/thankyou', {
            templateUrl: 'html/thankyou.html',
            controller: 'thankyouController'
        });


});

// create my controllers and inject Angular's $scope
myShoppingCart.controller('homeController', function ($scope, $log) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    $log.debug('Hej');
});

//products Controller
myShoppingCart.controller('productsController', function ($scope, $http, $log, productFactory) {
    $scope.message = 'Look! I am an products page.';


    $http({
        method: 'GET',
        url: 'products.json'
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
// shopping Controller
myShoppingCart.controller('shoppinglistController', function ($log, $scope, productFactory) {
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

// thank you Controller
myShoppingCart.controller('thankyouController', function ($log, $scope, productFactory) {
    $scope.message = 'thank you';

    // hämtar products från firebase
    productFactory.getPhonesFromFirebase()
        .then(function (data) {
            $log.debug('phones:', data);
            $scope.selectedProducts = getTotalPhonesSummary(data);
            $scope.$apply();
        });
// skapar funktion för totala summan
    function getTotalPhonesSummary(phones) {
        var totalSum = 0;

        angular.forEach(phones, function (phone) {
            //anropar getPhoneSum
            phone = getPhoneSummary(phone);
            totalSum = totalSum + phone.totalPrice;
        });
// sparar undan totala summan
        phones.totalSum = totalSum;

        return phones;
    }

    function getPhoneSummary(phone) {
        phone.totalPrice = phone.quantity * phone.price;
        return phone;
    }

});

<!-- skapar en service klass -->
myShoppingCart.factory('productFactory', function () {


// Initialize Firebase
    var config = {
        apiKey: "AIzaSyAcvLckYCILinyEL86xQqOUhpTjrntQbhc",
        authDomain: "shopping-e6b75.firebaseapp.com",
        databaseURL: "https://shopping-e6b75.firebaseio.com",
        storageBucket: "shopping-e6b75.appspot.com",
        messagingSenderId: "506566833108"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    console.log(database);

    var selectedProducts = [];

// skapar en write funktion som tar in id, namn, pris och url
    function writeUserData(id, name, price, url) {
        database.ref('products/' + id).set({
            products: name,
            price: price,
            profile_picture: url,
            id: id,
            quantity: 1
        });

    }

//skapar en update funktion
    function UpdateUserData(id, quantity) {

        var products = firebase.database().ref('products/' + id + '/');

        products.update({quantity: quantity});

    }

// minskar antalet produkter
    function decreaseQuantity(product) {
        if (product.quantity > 1) {
            product.quantity = product.quantity - 1;
            console.log(product)

            UpdateUserData(product.id, product.quantity)
        }

    }

// ökar antalet produkter
    function increaseQuantity(product) {
        product.quantity = product.quantity + 1;
        console.log(product)

        UpdateUserData(product.id, product.quantity)
    }

// skapar en read funktion som hämtar alla phones från firebase
    function getPhonesFromFirebase() {
        return firebase.database().ref('/products').once('value').then(function (snapshot) {
            var products = snapshot.val();
            var result = [];
            angular.forEach(products, function (product) {
                console.log(product);
                if (product) {
                    console.log('pushing');
                    result.push(product);
                }
            });
            return result;
        });
    }

// skriver till databasen (firebase)
    function addProduct(product) {
        writeUserData(product.id, product.product, product.price, product.url);
    }

//hämtar alla valda produkter
    function getAllSelectedProducts() {
        return selectedProducts;
    }

    // Deletar en produkt (firebase)
    function deleteProduct(id) {
        database.ref('products/' + id).remove();
    }


    return {
        addProduct: addProduct,
        getAllSelectedProducts: getAllSelectedProducts,
        getPhonesFromFirebase: getPhonesFromFirebase,
        deleteProduct: deleteProduct,
        decreaseQuantity: decreaseQuantity,
        increaseQuantity: increaseQuantity,


    };
});

*/

