var MainService = angular.module("MainService", []);

MainService.factory("MainServiceInstance", function ($http) {
    var baseUrl = "http://localhost:59208/api";
    var MainServiceInstance = {};

    MainServiceInstance.getPeople = function () {
        return $http.get(baseUrl + "/Person");
    };

    MainServiceInstance.addPeople = function (person) {
        return $http.post(baseUrl + "/Person/", person);
    };

    MainServiceInstance.editPeople = function (person) {
        var request = $http({
            method: 'put',
            url: baseUrl + "/Person/" + person.Id,
            data: person
        });
        return request;
    };

    MainServiceInstance.deletePeople = function (person) {
        var request = $http({
            method: 'delete',
            url: baseUrl + "/Person/" + person.Id            
        });
        return request;
    };

    return MainServiceInstance;
});