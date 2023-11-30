showLoading();

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    hideLoading(); // Call hideLoading when the Ajax request is complete
});

var pg = getUrlParameter('page');
console.log(pg);
if (pg == undefined)
    self.activate(1);
else {
    self.activate(pg);
}
console.log("VM initialized!");
