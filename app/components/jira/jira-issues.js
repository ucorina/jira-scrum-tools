angular.module('jiraScrumTools.jira.issues', [])

    .factory('jiraIssues', [
        '$resource', 'CONFIG', '$q',
        function ($resource, CONFIG, $q) {

            var params = {};
            var url = CONFIG.BASE_URL + 'rest/api/latest/issue/:id/:sub';
            var res = $resource(
                url, params,
                {
                    get: {
                        method: 'GET',
                        params: {
                            id: '@id',
                            sub: '@sub'
                        }
                    }
                }
            );

            return {
                get: function (p) {
                    return res.get(p).$promise;
                },

                getProject: function(projectName) {
                    var deferred = $q.defer();
                    res.get({sub: 'createmeta'}).$promise.then(
                        function(response) {
                            if(!response.projects) {
                                deferred.reject('No projects were found');
                                return;
                            }

                            for (var i in response.projects) {
                                if (response.projects[i].name == projectName) {
                                    var project = response.projects[i];
                                    project.issuetypes.unshift({name: 'All'});
                                    deferred.resolve(project);
                                    return;
                                }
                            }

                            deferred.reject('Project ' + projectName + ' was not found!');
                        }
                    );

                    return deferred.promise;
                }
            };
        }
    ]);
