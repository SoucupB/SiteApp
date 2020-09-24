// window.onload = function() {
//     window.localStorage.removeItem("auth_token")
// }

function login() {
    username = document.getElementById("usrn").value
    password = document.getElementById("psn").value
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/authenticate.json',
        data: {email: username, password: password},
        success: function( data ) {
            if(data["error"]) {
                delete_previous_element("errmsg");
                var element = document.getElementById("frge")
                add_error_after_element(element, "Wrong username or password!!", 90);
            }
            else
            {
                window.localStorage.setItem('auth_token', data['auth_token']);
                window.localStorage.setItem('user_type', data['user_type']);
                window.location.href = "bs-digishop-mini/index.html";
            }
        },
        dataType: 'json'
    });
    return false;
}

function sign_up() {
    window.location.href = "sign_up.html";
}