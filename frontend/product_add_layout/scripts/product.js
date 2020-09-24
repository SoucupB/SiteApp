
function add_product() {
    var name = document.getElementById('aadsaf').value
    var desc = document.getElementById('fsn').value
    var price = document.getElementById('lsn').value
    var amount = document.getElementById('zsn').value
    var prod_type = document.getElementById('efc').value
    var discount = document.getElementById('dscc').value
    console.log(discount)
    $.when(
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/product/1/create.json',
            data: {product: {name: name, amount: amount, price: price, description: desc, product_type: prod_type, discount: discount}},
            headers: {
                'Authorization': `Bearer ${secret_token()}`,
            },
            success: function( data ) {
                if(data["error"] == "Not Authorized") {
                    window.location.href = "../login_error/index.html";
                }
                else if(data["error"]){
                    var element = document.getElementById("reg")
                    add_error_after_element(element, data["error"], 90);
                }
                else {
                    post_photo(data["id"]);
                }
            },
            dataType: 'json'
        }),
    )
    return false;
}

function post_photo(id) {
    var datar = new FormData();
    var photo_meg = document.getElementById('photo')
    datar.append("photo", photo_meg.files[0])
    $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/product/' + id.toString() + '.json',
            data: datar,
            processData: false,
            contentType: false,
            headers: {
                 'Authorization': `Bearer ${secret_token()}`,
            },
            success: function(data)
            {
                if(data["error"] == "Not Authorized") {
                    window.location.href = "../login_error/index.html";
                }
                else {
                    window.location.href = "../bs-digishop-mini/index.html";
                }
            },
    });
}