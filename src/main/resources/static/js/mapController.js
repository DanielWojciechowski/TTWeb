'use strict';
app.controller("mapCtrl", function($scope, $rootScope, userService, $modal) {

    $scope.map = { center: { latitude: 52.229853, longitude: 21.011732 }, zoom: 15 };

    $scope.checkpoints = [];
    $scope.polylines = [];
    $scope.imageMarkers = [];

    $rootScope.$on('travelSelected', function () {
        var travel = userService.getTravelById(userService.getSelectedTravelId());
        $scope.map.center.latitude = travel.trace[0].latitude;
        $scope.map.center.longitude = travel.trace[0].longitude;

        setStartAndFinish(travel);
        setTrace(travel);


        while ($scope.imageMarkers.length > 0) {
            $scope.imageMarkers.pop();
        }

        angular.forEach(travel.photos, function(item) {
            $scope.imageMarkers.push({
                id: item.path,
                location: item.location,
                icon: "./images/photoPin.png"
            });
        });
    });

    function setStartAndFinish(travel) {
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
                latitude: travel.trace[travel.trace.length - 1].latitude,
                longitude: travel.trace[travel.trace.length - 1].longitude
            },
            icon: "./images/finish.png"
        });
    }

    function setTrace(travel) {
        if ($scope.polylines.length > 0) {
            $scope.polylines.pop();
        }

        $scope.polylines.push({
            id: travel.id,
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
    }

    $scope.markersEvents = {
        click: function (gMarker, eventName, model) {
            open(model.id);
        }
    };

    var open = function (id) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: './views/modal.html',
            controller: 'modalCtrl',
            size: 'lg',
            resolve: {
                img: function () {
                    return id;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
        });
    };

});