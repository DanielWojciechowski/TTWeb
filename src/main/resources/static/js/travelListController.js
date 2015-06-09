'use strict';
app.controller("travelListCtrl", function($scope, userService) {

    $scope.maxDate = new Date();
    $scope.selectedDate = null;
    $scope.travelsInDate = [];

    $scope.prepareList = function() {
        if($scope.selectedDate !== null) {
            $scope.travelsInDate = userService.getTravelsInDate($scope.selectedDate);
        }
    };

    $scope.$watch('selectedDate', function() {
        $scope.prepareList();
    });


    $scope.gridOptions = {
        data: 'travelsInDate',
        columnDefs: [
            {name: 'Nazwa', field: 'id'}

        ]
    };
});