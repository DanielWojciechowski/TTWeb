app.service('userService', function () {
    var username;
    var uid;
    var travels;

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

        getTravelsInDate: function(date) {
            var travelsInDate = [];

            angular.forEach(travels, function(item) {
                if((new Date(item.trace[0].date)).setHours(0,0,0,0) == date.setHours(0,0,0,0) ){
                    travelsInDate.push(item);
                }
            });
            return travelsInDate;
        }
    };
});