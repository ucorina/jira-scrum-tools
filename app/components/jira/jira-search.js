angular.module('jiraScrumTools.jira.projects', [])

    .factory('jiraProjects', [
        '$resource', 'CONFIG', '$q',
        function ($resource, CONFIG, $q) {

            var url = CONFIG.BASE_URL + '/rest/api/latest/search';
            var JiraSearch = $resource(url);

            return {
                getIssuesForSprint: function(sprintId) {
                    JiraSearch.query({

                    })
                },
                get: function (p) {
                    return res.get(p).$promise;
                },

                getStatuses: function(projectId) {
                    var deferred = $q.defer();
                    res.get({id: projectId, resource: 'statuses'}).$promise.then(
                        function (response) {
                            var states = response[0].statuses;
                            states.unshift({name:'All'});
                            deferred.resolve(states);
                        }
                    );
                    return deferred.promise;
                }
            };
        }
    ]);
