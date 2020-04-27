function add_hover() {
    $('#author table tr').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });
}

function load_author() {
    $.ajax({
        url: "data/author.json",
        method: "GET",
        type: "json",
        success: function (data) {
			data = JSON.parse(JSON.stringify(data));
            var author_data = `<h3>${data.name}</h3><h3>${data.index}</h3><div class="author_image"><img src="${data.image}" alt="${data.alt}"/></div><table>`;
            data.cv.forEach(function (col) {
                author_data += `<tr><td>${col.column1}</td><td>${col.column2}</td></tr>`;
            });
            author_data += "</table>";
            document.getElementById("author").innerHTML = author_data;
            add_hover();
        },
        error: function (xhr, error, status) {
            var author_data_error = `<h3>Error + ${error} fetching author data. Status ${status} !</h3>`;
            document.getElementById("author").innerHTML = author_data_error;
        }
    });
}

window.onload = function () {
    load_links();
    load_author();
    load_social();
};
