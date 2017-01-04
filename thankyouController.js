/**
 * Created by soan23 on 16/12/16.
 */

// thank you Controller
angular.module('myShoppingCart').controller('thankyouController', function ($scope, $log, productFactory) {
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