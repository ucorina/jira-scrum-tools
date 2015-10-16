angular.module('jiraScrumTools.jira.sprints', [])

    .factory('jiraSprints', [
        '$resource', 'CONFIG', 'Sprint', '$q',
        function ($resource, CONFIG, Sprint, $q) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/greenhopper/latest/xboard/work/allData.json';
            var Resource = $resource(
                url, params,
                {
                    getSingle: {
                        method: 'GET'
                    }
                }
            );

            angular.extend(Resource.prototype, Sprint);

            return {
                getSingle: function (p) {
                    return Resource.getSingle(p).$promise;
                },

                getCurrentSprintBoard: function(rapidViewId) {
                    var deferred = $q.defer();
                    Resource.getSingle({ rapidViewId: rapidViewId }).$promise.then(
                        function(response) {
                            deferred.resolve(response);
                        }
                    );
                    return deferred.promise;
                }
            };
        }
    ]);
