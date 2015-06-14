'use strict';
app.controller("travelListCtrl", function($scope, $rootScope, userService) {

    $scope.maxDate = new Date();
    $scope.selectedDate = null;
    $scope.travelsInDate = [];
    $scope.travelEventsList = null;

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
            {name: 'Identyfikator', field: 'id'},
            {name: 'Dystans', field: 'distance'},
            {name: 'Start', field: 'startTime'},
            {name: 'Czas trwania', field: 'duration'}

        ],
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;
        }
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            userService.setSelectedTravelId(row.entity.id);
            $rootScope.$broadcast('travelSelected');
        });
    };

    $scope.events = userService.getTravelEventList();

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };


    var travelsFetched = function(){
        $scope.events = userService.getTravelEventList();
        $scope.$broadcast('refreshDatepickers');
        $scope.travelsInDate = userService.getTravelsInDate(new Date());
    };

    userService.registerObserverCallback(travelsFetched);

});