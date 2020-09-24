function register() {
    email = document.getElementById("eml").value
    first_name = document.getElementById("fsn").value
    last_name = document.getElementById("lsn").value
    password = document.getElementById("psn").value
    type = document.getElementById("slt").value
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/user/sign_up.json',
        data: {email: email, password: password, first_name: first_name, last_name: last_name, user_type: type},
        success: function( data ) {
            console.log(data);
            if(data["error"]) {
                delete_previous_element("errmsg");
                var element = document.getElementById("reg")
                add_error_after_element(element, data["error"], 90);
            }
            else
            {
                window.location.href = "index.html";
            }
        },
        dataType: 'json'
    });
    return false;
}