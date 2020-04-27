function load_user() {
    var loaded_user = window.localStorage.getItem("user");
    if (loaded_user) {
        document.getElementById("user").innerHTML = "Welcome back: " + loaded_user;
        return;
    }
    if (!loaded_user) { loaded_user = "user" + Math.floor(Math.random() * 10000); }
    document.getElementById("user").innerHTML = "Welcome: " + loaded_user;
}

function load_quote() {
    $.ajax({
        url: "data/quotes.json",
        method: "GET",
        type: "json",
        success: function (quotes) {
			quotes = JSON.parse(JSON.stringify(quotes));
            var random = Math.floor(Math.random() * quotes.length);
            document.getElementById("quote").innerHTML = quotes[random];
        },
        error: function (xhr, error, status) {
            var quotes_error = `<h3>Error + ${error} fetching quotes. Status ${status} !</h3>`;
            document.getElementById("quote").innerHTML = quotes_error;
        }
    });
}

function load_driver() {
    window.setTimeout( function () {
        $("#bike_rider").animate({
            marginLeft: "+=200"
        }, 1000 , function() {
            var link;
            $.ajax({
                url: "data/links.json",
                method: "GET",
                type: "json",
                success: function (links) {
					links = JSON.parse(JSON.stringify(links));
                    links.forEach(function (l) {
                        if (l.text === "Bike Gallery") { link = l.link; }
                    });
                    document.getElementById("bike_text").className = "visible";
                    document.getElementById("bike_text").innerHTML = '<a href="' + link + '">Click to go for a ride on all bikes...</a>';
                },
                error: function (xhr, error, status) {
                    var links_error = `Error + ${error} fetching bike link. Status ${status} !`;
                    document.getElementById("bike_text").innerHTML = links_error;
                }
            });
        });
    }, 2000);
}

window.onload = function () {
    load_links();
    load_social();
    load_user();
    load_quote();
    load_driver();
};
