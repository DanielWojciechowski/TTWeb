var app = angular.module('ttweb', ['uiGmapgoogle-maps', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection']);
app.config(function(uiGmapGoogleMapApiProvider) {



    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDetO59xcCFPzP3c-wvfbTfQUuep5I9Y94',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

