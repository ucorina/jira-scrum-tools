angular.module('jiraScrumTools.jira.sprints', [])

    .factory('jiraSprints', [
        '$resource', 'CONFIG', 'Sprint',
        function ($resource, CONFIG, Sprint) {

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
                }
            };
        }
    ]);
