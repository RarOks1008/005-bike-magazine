var user_types = [
    {
        type: "select",
        value: "Select..."
    },
    {
        type: "big_spender",
        value: "Big spender"
    },
    {
        type: "budget_buyer",
        value: "Budget Buyer"
    },
    {
        type: "passionate_driver",
        value: "Passionate Driver"
    },
    {
        type: "old_timer",
        value: "Old Timer"
    },
    {
        type: "new_school",
        value: "New School"
    }
    ];

function fill_user_type() {
    var select = document.getElementById("user_type");
    user_types.forEach( function (type) {
        var u_type = document.createElement("option");
        u_type.value = type.type;
        u_type.innerHTML = type.value;
        select.appendChild(u_type);
    });
}
function form_submited() {
    var user_pat = /^([A-Z]|[a-z]|[0-9])+$/,
        email_pat = /^(\w|\d)\S*@\S+\.(\w|\d){2,}$/,
        gender = document.getElementsByName("gender"),
        user = document.getElementById("user_name").value,
        email = document.getElementById("email").value,
        option = document.getElementById("user_type").options[document.getElementById("user_type").selectedIndex].value,
        checked = false,
        which_checked;
    gender.forEach(function (g) {
        if (checked) { return; }
        if (g.checked) {
            checked = true;
            which_checked = g.value;
        }
    });
    if (!user) {
        document.getElementById("user_name_error").innerHTML = "Must enter a valid username.";
        return;
    }
    if (user.length < 3) {
        document.getElementById("user_name_error").innerHTML = "Username must be longer than 3 characters.";
        return;
    }
    if (!user_pat.test(user)) {
        document.getElementById("user_name_error").innerHTML = "Only letters and numbers are allowed.";
        return;
    }
    document.getElementById("user_name_error").innerHTML = "";
    if ((!email) || (!email_pat.test(email))) {
        document.getElementById("email_error").innerHTML = "Must enter a valid email.";
        return;
    }
    document.getElementById("email_error").innerHTML = "";
    if (!which_checked) {
        document.getElementById("gender_error").innerHTML = "Please select a gender.";
        return;
    }
    document.getElementById("gender_error").innerHTML = "";
    if (option === 'select') {
        document.getElementById("user_type_error").innerHTML = "Please select a valid option.";
        return;
    }
    document.getElementById("user_type_error").innerHTML = "";
    window.localStorage.setItem("user", user);
    window.localStorage.setItem("option", option);
    window.localStorage.setItem("gender", which_checked);
    document.getElementsByClassName("user_interface")[0].innerHTML = `<div class="huge">Form submited successfully!<div>`;
}

window.onload = function () {
    load_links();
    load_social();
    fill_user_type();
    document.getElementById("submit_user_settings").addEventListener('click', form_submited);
};
