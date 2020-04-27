function load_social() {
    $.ajax({
        url: "data/social_media.json",
        method: "GET",
        type: "json",
        success: function (socials) {
			socials = JSON.parse(JSON.stringify(socials));
            var soc = "<ul>";
            socials.forEach(function (s) {
                soc += `<li><a href="${s.link}"><img src="${s.image}" alt="${s.alt}"/></a></li>`;
            });
            soc += "</ul>";
            document.getElementById("soc_media").innerHTML = soc;
        },
        error: function (xhr, error, status) {
            var social_media_error = `<h3>Error + ${error} fetching social media information. Status ${status} !</h3>`;
            document.getElementById("soc_media").innerHTML = social_media_error;
        }
    });
}

function load_links() {
    $.ajax({
        url: "data/links.json",
        method: "GET",
        type: "json",
        success: function (links) {
			links = JSON.parse(JSON.stringify(links));
            var list = "<ul>";
            links.forEach(function (l) {
                list += `<li><a href="${l.link}">${l.text}</a></li>`;
            });
            list += "</ul>";
            document.getElementById("links").innerHTML = list;
        },
        error: function (xhr, error, status) {
            var links_error = `<h3>Error + ${error} fetching links. Status ${status} !</h3>`;
            document.getElementById("links").innerHTML = links_error;
        }
    });
}
