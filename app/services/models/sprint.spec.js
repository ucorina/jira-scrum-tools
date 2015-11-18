'use strict';

describe('jiraScrumTools.models.Sprint', function() {

    beforeEach(module('jiraScrumTools.models'));

    describe('Sprint', function() {

        var improvement =  {
                "id": 66291,
                "key": "DATACASS-235",
                "hidden": false,
                "typeName": "Improvement",
                "typeId": "4",
                "summary": "Release 1.1.4 (Evans)",
                "typeUrl": "https:\/\/jira.spring.io\/images\/icons\/issuetypes\/improvement.png",
                "priorityUrl": "https:\/\/jira.spring.io\/images\/icons\/priorities\/minor.png",
                "priorityName": "Minor",
                "done": true,
                "assignee": "olivergierke",
                "assigneeName": "Oliver Gierke",
                "avatarUrl": "https:\/\/secure.gravatar.com\/avatar\/27320c872264d5db7a38f65137d423db?d=mm&s=48",
                "hasCustomUserAvatar": true,
                "color": "#009900",
                "estimateStatistic": {
                    "statFieldId": "customfield_10142",
                    "statFieldValue": {
                        "value": 5,
                        "text": "5"
                    }
                },
                "trackingStatistic": {
                    "statFieldId": "timeestimate",
                    "statFieldValue": {

                    }
                },
                "statusId": "10001",
                "statusName": "Closed",
                "statusUrl": "https:\/\/jira.spring.io\/images\/icons\/statuses\/closed.png",
                "status": {
                    "id": "10001",
                    "name": "Closed",
                    "description": "An issue is done",
                    "iconUrl": "https:\/\/jira.spring.io\/images\/icons\/statuses\/closed.png",
                    "statusCategory": {
                        "id": "4",
                        "key": "indeterminate",
                        "colorName": "yellow"
                    }
                },
                "fixVersions": [
                    15344
                ],
                "projectId": 11403,
                "linkedPagesCount": 0
            };
        var bug =  {
                "id": 61879,
                "key": "DATAJPA-663",
                "hidden": false,
                "typeName": "Bug",
                "typeId": "1",
                "summary": "Investigate potential resource leak in Procedure support",
                "typeUrl": "https:\/\/jira.spring.io\/images\/icons\/issuetypes\/bug.png",
                "priorityUrl": "https:\/\/jira.spring.io\/images\/icons\/priorities\/minor.png",
                "priorityName": "Minor",
                "done": false,
                "assignee": "thomasd",
                "assigneeName": "Thomas Darimont",
                "avatarUrl": "https:\/\/secure.gravatar.com\/avatar\/014bb231d48031c2974e4f723cc381b2?d=mm&s=48",
                "hasCustomUserAvatar": true,
                "color": "#cc0000",
                "trackingStatistic": {
                    "statFieldId": "timeestimate",
                    "statFieldValue": {

                    }
                },
                "statusId": "10003",
                "statusName": "Investigating",
                "statusUrl": "https:\/\/jira.spring.io\/images\/icons\/statuses\/inprogress.png",
                "status": {
                    "id": "10003",
                    "name": "Investigating",
                    "description": "This issue is being actively worked on at the moment by the assignee. ",
                    "iconUrl": "https:\/\/jira.spring.io\/images\/icons\/statuses\/inprogress.png",
                    "statusCategory": {
                        "id": "4",
                        "key": "indeterminate",
                        "colorName": "yellow"
                    }
                },
                "fixVersions": [

                ],
                "projectId": 10552,
                "linkedPagesCount": 0
            };

        var sprintJson = {
            "issuesData": {
                "rapidViewId": 3,
                "activeFilters": [],
                "issues": [ improvement, bug ]
            }
        };

        it('should return the grand total', inject(function(Sprint) {
            var sprint = angular.extend(sprintJson, Sprint);
            expect(sprint.getTotal()).toBe(5)
        }));

        it('should return the total for a given status', inject(function(Sprint) {
            var sprint = angular.extend(sprintJson, Sprint);
            expect(sprint.getTotal('Open')).toBe(0)
        }));

        it('should return the percentage of closed tasks based on estimations', inject(function(Sprint) {
            var sprint = angular.extend(sprintJson, Sprint);
            expect(sprint.getPercentageCompleted()).toBe(100)
        }));


    });
});