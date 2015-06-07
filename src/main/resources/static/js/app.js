var app = angular.module('ttweb', ['uiGmapgoogle-maps']);
app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDetO59xcCFPzP3c-wvfbTfQUuep5I9Y94',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

app.controller("mapCtrl", function($scope) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
});
/*
app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './views/home.html',
            controller: 'homeController'
        });

    $urlRouterProvider.otherwise('/else');

});*/
