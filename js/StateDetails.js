// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/States/');
    self.displayName = 'NBA Arena Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Name = ko.observable('');
    self.Flag = ko.observable('');
    self.Arenas = ko.observableArray([]);
    self.Teams = ko.observableArray([]);
    self.displayedTeams = ko.observableArray([]);
    self.cardsPerPage = 24;


    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getStates...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Name(data.Name);
            self.Flag(data.Flag);
            self.Arenas(data.Arenas);
            self.Teams(data.Teams);
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");

    self.loadMore = function () {
        // Get the starting index of the current slice, ignoring the first 24 Teams
        var currentSliceStart = self.displayedTeams().length + 24;
    
        // Check if there are more Teams to display
        if (currentSliceStart < self.Teams().length) {
            // Calculate the ending index of the current slice
            var currentSliceEnd = currentSliceStart + self.cardsPerPage;
    
            // Get a new slice of Teams
            var newSlice = self.Teams.slice(currentSliceStart, currentSliceEnd);
    
            // Filter out Teams that are already displayed
            newSlice = newSlice.filter(function(player) {
                return self.displayedTeams.indexOf(player) === -1;
            });
    
            // Display the new slice of Teams
            self.displayedTeams(self.displayedTeams().concat(newSlice));
        }
    };

};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})
