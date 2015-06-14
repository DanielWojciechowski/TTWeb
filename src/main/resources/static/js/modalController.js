app.controller('modalCtrl', function ($http, $scope, $modalInstance, img, imgArr, userService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.image = null;
    var client = userService.getClient();
    $scope.img = imgArr[img];

    function setIsPrevAndNext() {
        $scope.isPrev = img > 0;
        $scope.isNext = img < imgArr.length - 1;
    }
    setIsPrevAndNext();

    $scope.ok = function () {
        $modalInstance.close('close');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.next = function(){
        $scope.image = null;
        $scope.img = imgArr[++img];
        loadImage();
        setIsPrevAndNext();
    };

    $scope.prev = function(){
        $scope.image = null;
        $scope.img = imgArr[--img];
        loadImage();
        setIsPrevAndNext();
    };

    $scope.angle = 0;
    $scope.dynamic = 0;
    $scope.max = 100;
/*    var xhrListener = function(dbXhr) {
        dbXhr.xhr.addEventListener("progress", function(event) {
            $scope.dynamic = Math.floor((event.loaded/event.total)*100);
            $scope.$apply();
        });
        return true;
    };
    client.onXhr.addListener(xhrListener);*/
    var loadImage = function(){
        client.readFile($scope.img, { arrayBuffer : true }, function(error, data) {
            //stopReportingProgress();
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
    };
    loadImage();
/*    client.onXhr.removeListener(xhrListener);*/
/*
    function stopReportingProgress() {
        $scope.dynamic = 100;
        $scope.$apply();
    }*/

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