app.service('userService', function () {
    var username;
    var uid;
    var travels;
    var selectedTravelId;
    var client;

    var observerCallbacks = [];

    this.registerObserverCallback = function(callback){
        observerCallbacks.push(callback);
    };

    var notifyObservers = function(){
        angular.forEach(observerCallbacks, function(callback){
            callback();
        });
    };

    var calculateTravelDistance = function(travel){
        var distance = 0;

        angular.forEach(travel.trace, function(item, i) {
            if(i < travel.trace.length - 1) {
                var nextItem = travel.trace[i+1];
                var from = new google.maps.LatLng(item.latitude, item.longitude);
                var to = new google.maps.LatLng(nextItem.latitude, nextItem.longitude);
                distance += google.maps.geometry.spherical.computeDistanceBetween(from, to);
            }
        });
        return distance;
    };

    var calculateTravelDuration = function(travel){
        var startDate = new Date(travel.trace[0].date);
        var endDate = new Date(travel.trace[travel.trace.length-1].date);
        var diffMs = (endDate - startDate);
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

        return diffHrs + "h, " + diffMins + "min";
    };

    var calculateTravelStartTime = function(travel){
        var startDate = new Date(travel.trace[0].date);
        return startDate.getHours() + ":" + (startDate.getMinutes()<10?'0':'') + startDate.getMinutes();

    };

    return {
        registerObserverCallback: function(callback){
            observerCallbacks.push(callback);
        },
        getUsername: function () {
            return username;
        },
        setUsername: function(value) {
            username = value;
        },

        getUid: function () {
            return uid;
        },
        setUid: function(value) {
            uid = value;
        },

        getTravels: function () {
            return travels;
        },
        setTravels: function(value) {
            travels = value;
            notifyObservers();
        },

        getSelectedTravelId: function () {
            return selectedTravelId;
        },
        setSelectedTravelId: function(value) {
            selectedTravelId = value;
        },

        getClient: function () {
            return client;
        },
        setClient: function(value) {
            client = value;
        },

        getTravelEventList: function() {
            var events = [];
            angular.forEach(travels, function(item) {
                var event = {
                    date: new Date(item.trace[0].date),
                    status: 'full'
                };
                events.push(event);
            });
            return events;
        },


        getTravelsInDate: function(date) {
            var travelsInDate = [];

            angular.forEach(travels, function(item) {
                if(new Date(item.trace[0].date).setHours(0,0,0,0) == date.setHours(0,0,0,0) ){
                    item.distance = Math.round(calculateTravelDistance(item)/10)/100 + "  km";
                    item.startTime = calculateTravelStartTime(item)
                    item.duration = calculateTravelDuration(item);

                    travelsInDate.push(item);
                }
            });
            return travelsInDate;
        },

        getTravelById: function(id) {
            var travel = {};
            angular.forEach(travels, function(item) {
                if(item.id == id){
                    travel = item;
                }
            });
            return travel;
        }

    };
});