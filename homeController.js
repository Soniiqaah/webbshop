/**
 * Created by soan23 on 16/12/16.
 */
// create my controllers and inject Angular's $scope
// also include ngRoute for all our routing needs

angular.module('myShoppingCart').controller('homeController', function ($scope, $log) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    $log.debug('Hej');
});