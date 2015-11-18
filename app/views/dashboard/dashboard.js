'use strict';

angular.module('jiraScrumTools.dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', [
        '$scope', 'jiraTasks', 'jiraSprints', 'jiraSprintQuery', 'jiraIssues', 'ngAudio', 'jiraProjects', '$interval',
        function ($scope, jiraTasks, jiraSprints, jiraSprintQuery, jiraIssues, ngAudio, jiraProjects, $interval) {

            // we add Math to scope so we can use math functions in the template
            $scope.Math = window.Math;

            $scope.achievement = 'success';
            $scope.task = {};
            $scope.project = null;
            $scope.sprint = null;
            $scope.states = null;
            $scope.issueType = null;

            // TO DO: make this configurable
            var rapidViewId = 3;
            var projectName = 'Aysist';
            var activeSprint = undefined;
            var timer = null;

            // TO DO: move audio into a separate audio component
            $scope.clap = ngAudio.load('sounds/clap.mp3');

            function initializeDashboard() {
                $scope.timer = 900;

                jiraIssues.getProject(projectName).then(function(project) {
                    $scope.project = project;
                    $scope.issueType = project.issuetypes[0];

                    jiraProjects.getStatuses(project.id).then(function(states) {
                        $scope.states = states;
                        $scope.issueState = states[0];
                    });

                }, function(errorMessage) {
                    alert(errorMessage);
                });
            }

            /**
             * @description Constructor
             */
            $scope.displaySprint = function(rapidViewId) {
                jiraSprintQuery.getSprints(rapidViewId).then(function(sprints) {
                    $scope.allSprints = sprints;
                });

                jiraSprints.getCurrentSprintBoard(rapidViewId).then(function(sprint) {
                    $scope.sprint = sprint;
                    $scope.achievement = sprint.getAchievement();
                });
            };

            $scope.startTimer = function() {

                $scope.timer = 900;

                timer = $interval(function(){
                    if ($scope.timer < 1) {
                        $scope.stopTimer();
                        alert('Time is up, please try to wrap it up!')
                    } else {
                        $scope.timer--;
                    }
                },1000);
            };

            $scope.stopTimer = function() {
                $scope.timer = 900;
                $interval.cancel(timer);
            };

            initializeDashboard();
            $scope.displaySprint(rapidViewId);
        }
    ]);