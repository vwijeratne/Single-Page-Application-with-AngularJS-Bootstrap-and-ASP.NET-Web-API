SPAApp.controller('AddController', function ($scope, MainServiceInstance) {
    $scope.addPeople = function () {
        var personToAdd = {
            'Id': $scope.Id,
            'Name': $scope.Name,
            'Age': $scope.Age
        };

        MainServiceInstance.addPeople(personToAdd).then(function (response) {
            alert(response.data);
            $scope.Id = undefined;
            $scope.Name = undefined;
            $scope.Age = undefined;
        });
    };
});