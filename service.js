/**
 * Created by soan23 on 16/12/16.
 */


<!-- skapar en service klass -->
angular.module('myShoppingCart').factory('productFactory', function () {
    //myShoppingCart.factory('productFactory', function ()

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
