angular.module('jiraScrumTools.jira.projects', [])

    .factory('jiraProjects', [
        '$resource', 'CONFIG', '$q',
        function ($resource, CONFIG, $q) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/api/2/project/:id/:resource';
            var res = $resource(
                url, params,
                {
                    get: {
                        method: 'GET',
                        params: {
                            id: '@id',
                            resource: '@resource'
                        },
                        isArray: true
                    }
                }
            );

            return {
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
