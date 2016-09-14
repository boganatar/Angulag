var module = angular.module('myapp', ['dndLists', 'ngRoute']);

module.config(
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'routes/notes/notes.html',
            controller: 'NotesController'
        }).otherwise({
            redirectTo: '/'
        })
    }
);

