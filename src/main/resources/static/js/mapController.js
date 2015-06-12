'use strict';
app.controller("mapCtrl", function($scope, $rootScope, userService) {

    $scope.map = { center: { latitude: 52.229853, longitude: 21.011732 }, zoom: 15 };

    $scope.checkpoints = [];
    $scope.polylines = [];

    $rootScope.$on('travelSelected', function () {
        var travel = userService.getTravelById(userService.getSelectedTravelId());
        $scope.map.center.latitude = travel.trace[0].latitude;
        $scope.map.center.longitude = travel.trace[0].longitude;

        $scope.checkpoints.push({
            id: "first",
            location: {
                latitude: travel.trace[0].latitude,
                longitude: travel.trace[0].longitude
            },
            icon: "./images/start.png"
        });
        $scope.checkpoints.push({
            id: "last",
            location: {
                latitude: travel.trace[travel.trace.length-1].latitude,
                longitude: travel.trace[travel.trace.length-1].longitude
            },
            icon: "./images/finish.png"
        });

        $scope.polylines.push({
            id: 3,
            path: travel.trace,
            stroke: {
                color: '#FF0066',
                weight: 3
            },
            editable: false,
            draggable: false,
            geodesic: true,
            visible: true
        });

    });

});