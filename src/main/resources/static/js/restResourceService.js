app.service('restResourceService', function () {
    return {
        getObjectIdFromUrl: function (url) {
            if(!!url) {
                return url.split('/').pop();
            }
        }
    };
});