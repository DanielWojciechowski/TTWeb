app.controller('modalCtrl', function ($http, $scope, $modalInstance, img, userService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.img = img;
    $scope.image = null;
    var client = userService.getClient();

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.angle = 0;
    $scope.value = 0;
    var xhrListener = function(dbXhr) {
        dbXhr.xhr.addEventListener("progress", function(event) {
            reportProgress(event.loaded, event.total);
        });
        return true;
    };
    client.onXhr.addListener(xhrListener);
    client.readFile(img, { arrayBuffer : true }, function(error, data) {
        stopReportingProgress();
        if (error) {
            alert(error);
        } else {
            var imgBase64 = "data:image/JPEG;base64," + arrayBufferToBase64(data);

            $scope.image = imgBase64;
            $scope.$apply();
            var imgElem = document.getElementById("imgF");
            EXIF.getData(imgElem, function() {
                var orientation = EXIF.getTag(imgElem, "Orientation");
                if(orientation !== 1) {
                    switch (orientation) {
                        case 6:
                            $scope.angle = 90;
                            break;
                        case 3:
                            $scope.angle = 180;
                            break;
                        case 8:
                            $scope.angle = 270;
                            break;
                    }
                    $scope.$apply();
                }
            });
        }
    });
    client.onXhr.removeListener(xhrListener);

    function reportProgress(loaded, total) {
        $scope.value = (loaded/total)*100;
    }
    function stopReportingProgress() {
        $scope.value = 100;
    }

    function arrayBufferToBase64( data ) {
        var binary = '';
        var bytes = new Uint8Array( data );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
});