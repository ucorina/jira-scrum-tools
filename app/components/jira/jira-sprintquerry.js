angular.module('jiraScrumTools.jira.sprintquery', [])

    .factory('jiraSprintQuery', [
        '$resource', 'CONFIG', '$q',
        function ($resource, CONFIG, $q) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/greenhopper/latest/sprintquery/:id';
            var res = $resource(
                url, params,
                {
                    getSingle: {
                        method: 'GET',
                        params: {
                            id: '@id'
                        }
                    }
                }
            );

            return {
                getSingle: function (p) {
                    return res.getSingle(p).$promise;
                },
                getActiveSprint: function(projectId) {
                    var deferred = $q.defer();
                    res.getSingle({id: projectId}).$promise.then(
                        function(response) {
                            if(!response.sprints) {
                                deferred.reject('There are no sprints in the project!');
                                return;
                            }

                            var activeSprint = _.find(response.sprints, function(item) {
                                return item.state == 'ACTIVE';
                            });
                            if (!activeSprint) {
                                deferred.reject('No active sprints were found for the project.');
                                return;
                            }

                            deferred.resolve(activeSprint);
                        }
                    );
                    return deferred.promise;
                }
            };
        }
    ]);
