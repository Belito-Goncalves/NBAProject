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

    console.log("PlayersData:", ko.toJS(self.playersData));

    // arenas
    self.arenasData = ko.observableArray([])
    self.loadarenas = () => {
        let data = JSON.parse(localStorage.getItem("arenaFavorites"))
        let temp = []
        if (data != null) {

            data.forEach(e => {
                $.ajax({
                    type: "GET",
                    url: "http://192.168.160.58/NBA/API/Arenas/Arena",
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
    
    self.arenasData(self.loadarenas());

    console.log("ArenasData:", ko.toJS(self.arenasData));

    

}

const f = new Favorites
ko.applyBindings(f);