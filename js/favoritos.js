function Favorites() {
    self = this

    // Drivers
    self.playersData = ko.observableArray([])
    self.loadPlayers = () => {
        let data = JSON.parse(localStorage.getItem("playerFavorites"))
        let temp = []
        if (data != null) {

            data.forEach(e => {
                $.ajax({
                    type: "GET",
                    url: "http://192.168.160.58/NBA/API/Players/Player",
                    async: false,
                    data: {
                        id: e
                    },
                    dataType: "json",
                    contentType: 'application/json',
                    success: function(response) {
                        temp.push(response)
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            });
        } else {
            temp = []
        }

        return temp;
    };

    self.playersData(self.loadPlayers());




    self.teamsData = ko.observableArray([])
    self.loadTeams = () => {
        let data = JSON.parse(localStorage.getItem("teamFavorites"))
        let temp = []
        if (data != null) {

            data.forEach(e => {
                $.ajax({
                    type: "GET",
                    url: "http://192.168.160.58/NBA/API/Teams/Team",
                    async: false,
                    data: {
                        id: e
                    },
                    dataType: "json",
                    contentType: 'application/json',
                    success: function(response) {
                        temp.push(response)
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            });
        } else {
            temp = []
        }

        return temp;
    };
    self.teamsData(self.loadTeams());

    // Races
    self.Data = ko.observableArray([])
    self.loadRaces = () => {
        let data = JSON.parse(localStorage.getItem("raceFavorites"))
        let temp = []
        if (data != null) {

            data.forEach(e => {
                $.ajax({
                    type: "GET",
                    url: "http://192.168.160.58/formula1/api/races/race",
                    async: false,
                    data: {
                        id: e
                    },
                    dataType: "json",
                    contentType: 'application/json',
                    success: function(response) {
                        temp.push(response)
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            });
        } else {
            temp = []
        }

        return temp;
    };

    self.racesData(self.loadRaces());

}

const f = new Favorites
ko.applyBindings(f);