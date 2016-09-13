var module = angular.module('myapp', []);

module.controller('AppController',
    function($scope) {
        $scope.userList =['1','2','3'];
    }
);

module.directive("list", function(){
    var directive = {};
    directive.resstrict = "E";
    directive.template = "<ul></ul>";

    directive.link = function($scope, element, attributes) {
        var el = element.find("ul");
        var arr = $scope[attributes['content']];
        for (var item in arr){
            el.append("<li>"+arr[item]+"</li>");
        }
    }
    return directive;
});