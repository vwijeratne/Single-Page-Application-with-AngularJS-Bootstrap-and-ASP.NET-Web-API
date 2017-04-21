SPAApp.controller('DeleteController', function ($scope, MainServiceInstance) {
    $scope.selectedItem = "Select person to delete";
    $scope.isDeleteItemVisible = false;
    getPeople();
    function getPeople() {
        MainServiceInstance.getPeople().then(function (people) {
            $scope.people = people;
        });
    }

    $scope.dropBoxItemSelected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.Name;
        $scope.name = item.Name;
        $scope.age = item.Age;
        $scope.personId = item.Id;

    };

    $scope.deletePeople = function () {
        var personToDelete = {
            'Id': $scope.personId,
            'Name': $scope.name,
            'Age': $scope.age
        };

        MainServiceInstance.deletePeople(personToDelete).then(function (response) {
            alert(response.data);
            $scope.personId = undefined;
            $scope.name = undefined;
            $scope.age = undefined;
            $scope.selectedItem = "Select person to delete";
            $scope.isDeleteItemVisible = false;
            getPeople();
        });
    };
});