// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Local variables
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Teams/');
    self.displayName = 'NBA Team Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.Opened = ko.observable('');
    // Data Record
    self.Id = ko.observable('');
    self.Acronym = ko.observable('');
    self.Name = ko.observable('');
    self.ConferenceId = ko.observable('');
    self.ConferenceName = ko.observable('');
    self.DivisionId = ko.observable('');
    self.DivisionName = ko.observable('');
    self.StateId = ko.observable('');
    self.StateName = ko.observable('');
    self.City = ko.observable('');
    self.Logo = ko.observable('');
    self.History = ko.observable('');
    self.Seasons = ko.observableArray([]);
    self.Players = ko.observableArray([]);

    // Page Events
    self.activate = function (id, acronym) {
        console.log('CALL: getTeam...');
        var composedUri = `${self.baseUri()}${id}?acronym=${acronym}`;
        
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
    
            // Check if data is not null or undefined
            if (data) {
                self.Id(data.Id || '');
                self.Flag(data.Flag || '');
                self.Name(data.Name || '');
                self.Teams(data.Teams || '');
                self.Arenas(data.Arenas || '');
                console.log(data)
            } else {
                console.error('Data is null or undefined!');
            }
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
    var acr = getUrlParameter('acronym');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg,acr);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})

