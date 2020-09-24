var sorter = 0;
var filter_args = "";
var categ_dicts = {"telefon": "Mobile", "pc": "Computers", 'elec': 'Appliances', 'jocuri': 'Games & Entertainment',
                   'haindeb': "Men's Clothing", 'hainef': "Women's Clothing", 'hainec': "Kid's Wear",
                   'accmobile': "Mobile Accessaries", 'accb': "Men's Accessaries", 'accf': "Women's Accessaries", "accc": "Kid's Accessaries", 'prodcas': "Home Products", 'prodbuc': 'Kitchen Products'};
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function delete_previous_element(id) {
    var previous_object = document.getElementById(id);
    if(previous_object)
        previous_object.remove();
}

function delete_rows() {
    for(var i = 0; i < table_rows.length; i++) {
        document.getElementById(table_rows[i]).remove();
    }
    table_rows = []
}

function add_error_after_element(first, message, left) {
    var error_message = document.createElement("p");
    error_message.id = "errmsg";
    error_message.innerHTML = message;
    error_message.style.position = "relative";
    error_message.style.color = "red";
    error_message.style.left = left + "px";
    insertAfter(first, error_message);
}

function get_sorting_arguments() {
    if(sorter === 1)
        return '&sort_by=price_low'
    if(sorter === 2)
        return '&sort_by=price_high'
    return ""
}

function get_filters() {
    if(filter_args !== "")
        return '&filter_name=' + filter_args;
    return "";
}

function secret_token() {
    return window.localStorage.getItem("auth_token");
}

function delete_local_storage() {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("user_type");
}

function user_type() {
    return window.localStorage.getItem("user_type");
}