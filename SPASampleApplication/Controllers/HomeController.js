SPAApp.controller('HomeController', function ($scope, MainServiceInstance) {
    getPeople();
    function getPeople() {
        $scope.people = [];
        MainServiceInstance.getPeople().then(function (people) {
            $scope.people = people;
        });
    }
});