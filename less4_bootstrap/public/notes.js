var module = angular.module('myapp', []);

module.controller('NotesController',
    function($scope,$http) {
        $scope.notes = [];

        var update = function() {
            var params = {params:{section:$scope.activeSection}};
            $http.get("/notes", params)
                .success(function(notes) {
                    $scope.notes = notes;
                });
        };



        var readSections = function() {
            $http.get("/sections")
                .success(function(sections) {
                    $scope.sections = sections;
                    if ($scope.activeSection == null &&
                        $scope.sections.length>0) {
                        $scope.activeSection =
                            $scope.sections[0].title;
                    }

                    update();
                });


        }
        readSections();

        $scope.writeSections = function() {
            if ($scope.sections && $scope.sections.length>0) {
                $http.post("/sections/replace", $scope.sections);
            }
        };

        $scope.showSection = function(section) {
            $scope.activeSection = section.title;
            update();
        };

        $scope.addSection = function() {
            if ($scope.newSection.length==0) return;
            // check for duplicates
            for (var i=0;i<$scope.sections.length;i++) {
                if ($scope.sections[i].title==$scope.newSection) {
                    return;
                }
            }
            var section = {title: $scope.newSection};
            $scope.sections.unshift(section);
            $scope.activeSection = $scope.newSection;
            $scope.newSection = "";
            $scope.writeSections();
            update();
        }

        $scope.add = function() {
            var note = {text: $scope.text};
            $http.post("/notes", note)
                .success(function() {
                    $scope.text = "";
                    update();
                });
        };

        update();
    });

