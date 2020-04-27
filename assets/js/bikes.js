function load_bikes(option, gender) {
    $.ajax({
        url: "data/bikes.json",
        method: "GET",
        type: "json",
        success: function (bikes) {
			bikes = JSON.parse(JSON.stringify(bikes));
            var show = "";
            if (gender === 'male') {
                bikes = bikes.filter(bike => bike.title.indexOf('Lady') === -1);
            }
            if (gender === 'female') {
                bikes = bikes.filter(bike => bike.title.indexOf('Lady') !== -1);
            }
            if (option === 'big_spender') {
                bikes.sort(function(a,b) {
                    if(a.price == b.price)
                        return 0;
                    return a.price > b.price ? -1 : 1;
                });
            }
            if (option === 'budget_buyer') {
                bikes.sort(function(a,b) {
                    if(a.price == b.price)
                        return 0;
                    return a.price > b.price ? 1 : -1;
                });
            }
            if (option === 'passionate_driver') {
                bikes = bikes.filter(bike => bike.driving_teams.length > 0);
            }
            if (option === 'old_timer') {
                bikes.sort(function(a,b) {
                    if(a.year == b.year)
                        return 0;
                    return a.year > b.year ? 1 : -1;
                });
            }
            if (option === 'new_school') {
                bikes.sort(function(a,b) {
                    if(a.year == b.year)
                        return 0;
                    return a.year > b.year ? -1 : 1;
                });
            }
            bikes.forEach(function (b) {
                show += `<div class="bike"><h3>${b.title}</h3><img src="${b.image}" alt="${b.alt}"/><h4>Bike description:</h4><p class="bike_description">${b.description}</p>`;
                if (b.driving_teams.length > 0) {
                    show += `<p class="driving_team">Driving Professionals: `;
                    b.driving_teams.forEach(function (dt) {
                        if (dt === b.driving_teams[b.driving_teams.length - 1]) {
                            show += `${dt}`;
                            return;
                        }
                        show += `${dt}, `;
                    });
                    show += `</p>`;
                }
                show += `<p class="bike_year">Release year: ${b.year}</p><p class="bike_price">Price: ${b.price}&#163;</p></div>`;
            });
            if (show) {
                document.getElementById("bikes").innerHTML = show;
                return;
            }
            document.getElementById("bikes").innerHTML = `<h3 class="no_bikes">There are no bikes with these fields...</h3>`;
        },
        error: function (xhr, error, status) {
            var bikes_error = `<h3>Error + ${error} fetching bikes. Status ${status} !</h3>`;
            document.getElementById("bikes").innerHTML = bikes_error;
        }
    });
}

function fill_form(data) {
    var select = document.getElementById("bike_selection"),
        max = 0;
    $.ajax({
        url: "data/bikes.json",
        method: "GET",
        type: "json",
        success: function (bikes) {
			bikes = JSON.parse(JSON.stringify(bikes));
            bikes.forEach(function (b) {
                if (b.price > max) { max = b.price; }
            });
            document.getElementById("price_range").max = max;
            document.getElementById("price_range").value = max;
            document.getElementById("max_price").innerHTML = max;
        },
        error: function (xhr, error, status) {
            var bikes_error = `Error + ${error} fetching bike prices. Status ${status} !`;
            document.getElementById("max_price").innerHTML = bikes_error;
        }
    });
    $.ajax({
        url: "data/form_data.json",
        method: "GET",
        type: "json",
        success: function (f_data) {
			f_data = JSON.parse(JSON.stringify(f_data));
            var sb_data = '',
                g_data = '';
            f_data.sort_by.forEach(function (sb) {
                sb_data += `<option id="${sb.type}" value="${sb.type}">${sb.value}</option>`;
            });
            document.getElementById("sort_by").innerHTML = sb_data;
            f_data.gender.forEach(function (g) {
                g_data += `<option id="${g.type}" value="${g.type}">${g.value}</option>`;
            });
            document.getElementById("show_gender").innerHTML = g_data;
            for (var i = 0; i < document.getElementById("show_gender").options.length; i++) {
                if (data.gender === document.getElementById("show_gender").options[i].value) {
                    document.getElementById("show_gender").selectedIndex = i;
                }
            }
            if (data.option === 'passionate_driver') {
                document.getElementById("bike_pros").checked = true;
            }
            if (data.option === 'big_spender') {
                for (var i = 0; i < document.getElementById("sort_by").options.length; i++) {
                    if (document.getElementById("sort_by").options[i].value === 'price_high') {
                        document.getElementById("sort_by").selectedIndex = i;
                    }
                }
            }
            if (data.option === 'budget_buyer') {
                for (var i = 0; i < document.getElementById("sort_by").options.length; i++) {
                    if (document.getElementById("sort_by").options[i].value === 'price_low') {
                        document.getElementById("sort_by").selectedIndex = i;
                    }
                }
            }
            if (data.option === 'old_timer') {
                for (var i = 0; i < document.getElementById("sort_by").options.length; i++) {
                    if (document.getElementById("sort_by").options[i].value === 'year_early') {
                        document.getElementById("sort_by").selectedIndex = i;
                    }
                }
            }
            if (data.option === 'new_school') {
                for (var i = 0; i < document.getElementById("sort_by").options.length; i++) {
                    if (document.getElementById("sort_by").options[i].value === 'year_newest') {
                        document.getElementById("sort_by").selectedIndex = i;
                    }
                }
            }
        },
        error: function (xhr, error, status) {
            var form_data_error = `<h3>Error + ${error} fetching form data. Status ${status} !</h3>`;
            document.getElementsByClassName("bike_selection")[0].innerHTML = form_data_error;
        }
    });
}

function bikes_submited(data) {
    $.ajax({
        url: "data/bikes.json",
        method: "GET",
        type: "json",
        success: function (bikes) {
			bikes = JSON.parse(bikes);
            var show = '';
            if (data.show_gender === 'male') {
                bikes = bikes.filter(bike => bike.title.indexOf('Lady') === -1);
            }
            if (data.show_gender === 'female') {
                bikes = bikes.filter(bike => bike.title.indexOf('Lady') !== -1);
            }
            bikes = bikes.filter(bike => bike.price <= data.price_range);
            if (data.bike_pros) {
                bikes = bikes.filter(bike => bike.driving_teams.length > 0);
            }
            if (data.sort_by === 'name_a-z') {
                bikes.sort(function (a,b) {
                    if (a.title === b.title)
                        return 0;
                    return a.title > b.title ? 1 : -1;
                });
            }
            if (data.sort_by === 'name_z-a') {
                bikes.sort(function (a,b) {
                    if (a.title === b.title)
                        return 0;
                    return a.title > b.title ? -1 : 1;
                });
            }
            if (data.sort_by === 'price_low') {
                bikes.sort(function (a,b) {
                    if (a.price === b.price)
                        return 0;
                    return a.price > b.price ? 1 : -1;
                });
            }
            if (data.sort_by === 'price_high') {
                bikes.sort(function (a,b) {
                    if (a.price === b.price)
                        return 0;
                    return a.price > b.price ? -1 : 1;
                });
            }
            if (data.sort_by === 'year_early') {
                bikes.sort(function (a,b) {
                    if (a.year === b.year)
                        return 0;
                    return a.year > b.year ? 1 : -1;
                });
            }
            if (data.sort_by === 'year_newest') {
                bikes.sort(function (a,b) {
                    if (a.year === b.year)
                        return 0;
                    return a.year > b.year ? -1 : 1;
                });
            }
            bikes.forEach(function (b) {
                show += `<div class="bike"><h3>${b.title}</h3><img src="${b.image}" alt="${b.alt}"/><h4>Bike description:</h4><p class="bike_description">${b.description}</p>`;
                if (b.driving_teams.length > 0) {
                    show += `<p class="driving_team">Driving Professionals: `;
                    b.driving_teams.forEach(function (dt) {
                        if (dt === b.driving_teams[b.driving_teams.length - 1]) {
                            show += `${dt}`;
                            return;
                        }
                        show += `${dt}, `;
                    });
                    show += `</p>`;
                }
                show += `<p class="bike_year">Release year: ${b.year}</p><p class="bike_price">Price: ${b.price}&#163;</p></div>`;
            });
            if (show) {
                document.getElementById("bikes").innerHTML = show;
                return;
            }
            document.getElementById("bikes").innerHTML = `<h3 class="no_bikes">There are no bikes with these fields...</h3>`;
        },
        error: function (xhr, error, status) {
            var bikes_error = `<h3>Error + ${error} fetching bikes. Status ${status} !</h3>`;
            document.getElementById("bikes").innerHTML = bikes_error;
        }
    });
}

window.onload = function () {
    var option = window.localStorage.getItem("option"),
        gender = window.localStorage.getItem("gender");
    load_links();
    load_social();
    fill_form({option: option, gender: gender});
    load_bikes(option, gender);
    document.getElementById("price_range").addEventListener("change", function() {
        document.getElementById("max_price").innerHTML = document.getElementById("price_range").value;
    });
    document.getElementById("submit_bikes").addEventListener("click", function() {
        var sort_by = document.getElementById("sort_by").options[document.getElementById("sort_by").selectedIndex].value,
            show_gender = document.getElementById("show_gender").options[document.getElementById("show_gender").selectedIndex].value,
            price_range = document.getElementById("price_range").value,
            bike_pros = document.getElementById("bike_pros").checked;
        bikes_submited({sort_by: sort_by, show_gender: show_gender, price_range: price_range, bike_pros: bike_pros});
    });
};
