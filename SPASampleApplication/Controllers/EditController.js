SPAApp.controller('EditController', function ($scope, MainServiceInstance) {
    $scope.selectedItem = "Select person to edit";
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

    $scope.editPeople = function () {
        var personToEdit = {
            'Id': $scope.personId,
            'Name': $scope.name,
            'Age': $scope.age
        };

        MainServiceInstance.editPeople(personToEdit).then(function (response) {
            alert(response.data);
            $scope.personId = undefined;
            $scope.name = undefined;
            $scope.age = undefined;
            $scope.selectedItem = "Select person to edit";
            $scope.isDeleteItemVisible = false;
            getPeople();
        });
    };
});