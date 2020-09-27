function slider_requests(type, ids) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000//random_products.json',
        data: {number: 4, categ: type},
        success: function( data ) {
            for(var i = 0; i < data['products'].length; i++) {
                create_sliders(data['products'][i]['img_url'], data['products'][i]['name'], ids, data['products'][i]['price']);
            }
        },
        dataType: 'json'
    })
}

function get_ads() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/ads_products.json',
        data: {number: 1},
        success: function( data ) {
            for(var i = 0; i < data['ads'].length; i++) {
                adds(data['ads'][i]['name'], data['ads'][i]['img_url'], data['ads'][i]['value'],
                data['ads'][i]['description'], data['ads'][i]['price'], data['ads'][i]['discount'], data['ads'][i]['discounted_sum'])
            }
        },
        dataType: 'json'
    })
}
function get_all_paginated_products(page, per_page) {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/paginates/products.json?page=' + page.toString() + '&per_page=' + per_page.toString() + get_sorting_arguments() + get_filters(),
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        success: function( data ) {
            if(data["error"]) {
                window.location.href = "../login_error/index.html";
            }
            else {
                remove_ids(ids);
                for(var i = 0; i < data['products'].length; i++) {
                    add_objects_to_page_html(data['products'][i]['id'], data['products'][i]['name'], data['products'][i]['price'],
                                             data['products'][i]['description'], data['products'][i]['img_url'],
                                             data['products'][i]['amount'], data['products'][i]['is_in_cart'], page.toString(),
                                             data['products'][i]['discount'], data['products'][i]['discounted_sum']);
                }
                set_total_objects(data['total_count'])
                number_of_pages(data['pages']);
            }
        },
        dataType: 'json'
    })
    return false
}

function get_logged_persons_money() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/get_money.json',
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        success: function( data ) {
            var elem = document.getElementById('funds')
            elem.innerHTML = "Funds: " + data['funds'].toFixed(2).toString() + "$";
        },
        dataType: 'json'
    })
}

function get_cart_products() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/get_cart.json',
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        success: function( data ) {
            if(data["error"] && data["error"] != 'The user does not have a cart!') {
                error_not_enough_funds(data["error"]);
            }
            else if(data["error"] != 'The user does not have a cart!'){
                remove_error_cart_message();
                delete_rows();
                for(var i = 0; i < data['products'].length; i++) {
                    create_table(i + 1, data['products'][i]["id"], data['products'][i]["name"], data['products'][i]["description"],
                                 data['products'][i]["price"], data['products'][i]["img_url"], data['products'][i]["discount"], data['products'][i]["discounted_sum"])
                }
                add_total_sum(data['total_sum']);
            }
            else {
                remove_error_cart_message();
                delete_rows();
            }
        },
        dataType: 'json'
    })
}

function pay() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/pay/cart.json',
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        success: function( data ) {
            if(data["error"]) {
                error_not_enough_funds("Not enough funds!");
            }
            else {
                get_logged_persons_money();
                get_all_paginated_products(1, 9);
                close_popup('myModal');
            }
        },
        dataType: 'json'
    })
}

function drop() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/drop/cart.json',
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        success: function( data ) {
            if(data["error"]) {
                error_not_enough_funds("This cart is empty!");
            }
            else {
                get_all_paginated_products(1, 9);
                get_logged_persons_money()
                close_popup('myModal')
            }
        },
        dataType: 'json'
    })
}

function get_categories_number() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/category/products.json',
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        success: function( data ) {
            add_counts(data['products']);
        },
        dataType: 'json'
    })
}

function add_to_cart(product_id, page) {
    if(!secret_token()) {
        window.location.href = "../index.html";
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/cart/' + product_id.toString(),
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        data: {amount: 1},
        success: function( data ) {
            get_all_paginated_products(page, 9);
        },
        dataType: 'json'
    })
}

function remove_from_cart(product_id, page) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/delete_cart/' + product_id.toString(),
        headers: {
            'Authorization': `Bearer ${secret_token()}`,
        },
        success: function( data ) {
            console.log(data);
            get_all_paginated_products(page, 9);
        },
        dataType: 'json'
    })
}