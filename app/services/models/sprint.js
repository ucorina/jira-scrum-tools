'use strict';

angular.module('jiraScrumTools.models', []).
    factory('Sprint', function() {
        return {
            /**
             * @description Returns the total number of points for the specified type of issue.
             * @param {string} status Returns the total number of points for the specified status. If no status is mentioned it returns the total for all issues.
             * @return {number}
             */
            getTotal: function(status) {
                var total = 0;

                if (this.issuesData && this.issuesData.issues) {

                    var issues = this.issuesData.issues;

                    for (var i in issues) {
                        if (issues[i].estimateStatistic &&
                            issues[i].estimateStatistic.statFieldValue &&
                            issues[i].estimateStatistic.statFieldValue.value) {

                            if (status) {
                                if (issues[i].statusName == status) {
                                    total += issues[i].estimateStatistic.statFieldValue.value;
                                }
                            } else {
                                total += issues[i].estimateStatistic.statFieldValue.value;
                            }

                        }
                    }
                }

                return total;
            },

            getPercentageCompleted: function() {
                return this.getTotal('Closed') / this.getTotal() * 100;
            },

            /**
             * @description Sets the achievement type to that the progress bar can display the right colour
             */
            getAchievement: function() {
                var value = this.getPercentageCompleted();

                if (value < 70) {
                    return 'danger';
                } else if (value < 80) {
                    return 'warning';
                } else if (value < 90) {
                    return 'success';
                }
            }
    };
});