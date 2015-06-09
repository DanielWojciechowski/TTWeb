'use strict';
app.controller("headerCtrl", function($scope, $http, userService/*, restResourceService*/) {

    $http.defaults.headers.post["Content-Type"] = "application/json";

    function prepareViewData() {
        var client = new Dropbox.Client({
            key: "iii0xdl1te6r4do",
            secret: "8ov9jpb30eh9h45"
        });
        client.authenticate(function (error, client) {
            if (error) {
                return;
            }
            client.getAccountInfo(function (error, accountInfo) {
                if (error) {
                    return;
                }
                userService.setUsername(accountInfo.name);
                userService.setUid(accountInfo.uid);
                $scope.username = userService.getUsername();

                $http.jsonp('https://ttserver.cfapps.io/travels/search/findTravelsByUserUID?uid='+userService.getUid()+"&callback=JSON_CALLBACK").
                    success(function (data) {
                        if (data != undefined) {
                            $scope.travels = data._embedded.travels;
                            userService.setTravels($scope.travels)
                            /*prepareObjectIds($scope.travels);*/
                        }
                    });
            });
        });
    }

/*    var prepareObjectIds = function(array){
        angular.forEach(array, function(value, key) {
            value.reservationId = restResourceService.getObjectIdFromUrl(value._links.self.href);
        });
    }*/

    prepareViewData();
});