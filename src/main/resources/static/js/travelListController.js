'use strict';
app.controller("travelListCtrl", function($scope, $rootScope, userService) {

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
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: true,
        data: 'travelsInDate',
        columnDefs: [
            {name: 'Nazwa', field: 'id'}

        ],
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;
        }
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            userService.setSelectedTravelId(row.entity.id)
            $rootScope.$broadcast('travelSelected');
        });
    };
});