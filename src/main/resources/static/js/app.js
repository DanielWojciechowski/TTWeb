var app = angular.module('ttweb', ['uiGmapgoogle-maps', 'ui.bootstrap', 'ui.grid']);
app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDetO59xcCFPzP3c-wvfbTfQUuep5I9Y94',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

app.controller("mapCtrl", function($scope) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.myData = [
        {name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}];

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
