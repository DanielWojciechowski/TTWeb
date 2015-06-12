app.service('userService', function () {
    var username;
    var uid;
    var travels;
    var selectedTravelId;

    return {
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
        },

        getSelectedTravelId: function () {
            return selectedTravelId;
        },
        setSelectedTravelId: function(value) {
            selectedTravelId = value;
        },

        getTravelsInDate: function(date) {
            var travelsInDate = [];

            angular.forEach(travels, function(item) {
                if((new Date(item.trace[0].date)).setHours(0,0,0,0) == date.setHours(0,0,0,0) ){
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