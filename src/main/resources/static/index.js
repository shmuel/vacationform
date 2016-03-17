app = angular.module("vacation-form", ['ui.router']);

app.controller("step1", function($scope, vacationData) {
    $scope.vacationData = vacationData;
    $scope.sickDays = 10;
});

app.controller("step2", function($scope, vacationData) {
    $scope.vacationData = vacationData;
    vacationData.ptoDays = vacationData.weeks * 5 + 10;

    $scope.addPlan = function () {
        var plan = {fromDate: '', toDate: '', note: '' };
        $scope.vacationData.vacationPlans.push(plan);
        console.log(vacationData);
    };
});

app.controller("step3", function($scope, vacationData, $http) {
    $scope.vacationData = vacationData;
    $scope.returnStatus = "pending";
    var url = "/api/setVacationPlans";
    var body = vacationData;
    console.log(body);
    $http.post(url, body).then(
        function (success) {
            console.log("yeah");
            $scope.returnStatus = success.data;
        },
        function (failure) {
            console.log("doh");
            $scope.returnStatus = failure.data;
        }
    );
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('step1', {
            url: '/step1',
            templateUrl: 'step1.html'
        })

        .state('step2', {
            url: '/step2',
            templateUrl: 'step2.html'
        })

        .state('step3', {
            url: '/step3',
            templateUrl: 'step3.html'
        });

    $urlRouterProvider.otherwise("/step1");
});


app.factory("vacationData", function() {  // to share information
    var vacationData = {};
    vacationData.name = "Michael Dirk";
    vacationData.weeks = 0;
    vacationData.ptoDays = 0;
    vacationData.vacationPlans = [];
    vacationData.vacationPlans.push({
        fromDate: "03-01-2106", toDate: "03-03-2106",
        note: 'myNote1' });
    vacationData.vacationPlans.push({fromDate: "04-04-2106", toDate: "04-12-2106",
        note: 'myNote2' });
    vacationData.vacationPlans.push({fromDate: '', toDate: '', note: '' });
    return vacationData;
});

