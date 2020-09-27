
var ids = [];
var buttons = [];
var table_rows = [];

window.onload = function() {
    jQuery.support.cors = true
    add_product_button();
    add_pay_cart_button();
    is_logged_in();
    funds_button();
    $.when(
        slider_requests('electronice', 'slider_elect'),
        slider_requests('haine', 'slider_haine'),
        slider_requests('accesorii', 'slider_accesorii'),
        get_ads(),
        get_all_paginated_products(1, 9),
        get_logged_persons_money(),
        get_categories_number()
    )
}

function funds_button() {
    if(secret_token()) {
        var slider_element = document.getElementById('navbar');
        stre = '<li><a href="#" id = "funds">Funds: </a></li>'
        var element = htmlToElement(stre)
        slider_element.appendChild(element);
    }
}

function add_counts(products) {
    var prods = Object.keys(products)
    for(var i = 0; i < prods.length; i++) {
        if(document.getElementById(categ_dicts[prods[i]])) {
            var elem = document.getElementById(categ_dicts[prods[i]]);
            elem.innerHTML = products[prods[i]];
        }
    }
}

function is_logged_in() {
    if(!secret_token()) {
        var slider_element = document.getElementById('navbar');
        stre = '<li><a href="../index.html">Login</a></li>'
        var element = htmlToElement(stre)
        slider_element.appendChild(element);
    }
    else {
        var slider_element = document.getElementById('navbar');
        stre = '<li><a onclick = "logout()" href="#">Logout</a></li>'
        var element = htmlToElement(stre)
        slider_element.appendChild(element);
    }
}

function add_product_button() {
    if(user_type() == 'distribuitor') {
        var slider_element = document.getElementById('navbar');
        stre = '<li><a href="../product_add_layout/index.html">Add Product</a></li>'
        var element = htmlToElement(stre)
        slider_element.appendChild(element);
    }
}

function close_popup(id) {
    var moder = document.getElementById(id);
    moder.style.display = "none";
}

function create_cart_popup() {
    var moder = document.getElementById('myModal');
    moder.style.display = "block";
    get_cart_products();
    return false;
}

function create_description_popup(id, descriere) {
    descriere = descriere.replace(/_/g, ' ')
    var moder = document.getElementById('descModal');
    var father = document.getElementById('descr');
    if(document.getElementById("comments")) {
        document.getElementById("comments").remove();
    }
    var stre = '<strong id = "comments">' + descriere + '</strong>';
    var element = htmlToElement(stre);
    father.appendChild(element);
    moder.style.display = "block";
    return false;
}

function create_table(index, id, name, description, price, image_link, discount, discounter_sum) {
    var tables = document.getElementById("tb");
    var generated_id = random_ids(7)
    var stre = '<tr id = ' + generated_id + '><td>' + index.toString() + '</td><td><img src=" ' + image_link +
               '" alt="" style="width:70px;height:43px;" /></td><td>' + id.toString() + '</td><td>' + name + '</td><td>' +
                  description + '</td><td>' + price.toString() + '</td>' + '<td>' + discount.toString() + '%</td>' + '<td>' + discounter_sum.toFixed(2).toString() + '</td></tr>'
    var element = htmlToElement(stre);
    table_rows.push(generated_id);
    tables.appendChild(element);
}

function add_total_sum(total_sum) {
    var tables = document.getElementById("tb");
    var generated_id = random_ids(7)
    var stre = '<tr id = ' + generated_id + '><td></td><td></td><td></td><td></td><td></td><td></td><td>Total: </td><td>' + total_sum.toFixed(2).toString() + '</td></tr>'
    var element = htmlToElement(stre);
    table_rows.push(generated_id);
    tables.appendChild(element);
}

function error_not_enough_funds(message) {
    var tables = document.getElementById("tb");
    remove_error_cart_message();
    var stre = '<p id = "error_mes" style="color:red">' + message + '</p>'
    var element = htmlToElement(stre);
    insertAfter(tables, element)
}

function remove_error_cart_message() {
    var prev_error_message = document.getElementById("error_mes");
    if(prev_error_message)
        prev_error_message.remove();
}

function add_pay_cart_button() {
    if(user_type() == 'normal') {
        var slider_element = document.getElementById('navbar');
        stre = '<li><a href = "#" onclick="create_cart_popup()">Pay Cart</a></li>'
        var element = htmlToElement(stre)
        slider_element.appendChild(element);
    }
}

function search_chars() {
    console.log(document.getElementById('searcher_bar').value);
    filter_args = document.getElementById('searcher_bar').value;
    get_all_paginated_products(1, 9);
    return false;
}

function show_sorted_methods(sort_by) {
    if(sort_by == 'price_low')
        sorter = 1;
    if(sort_by == 'price_high')
        sorter = 2;
    get_all_paginated_products(1, 9);
    return false
}

function create_sliders(slider_image, slider_name, obj_id, price) {
    var slider_element = document.getElementById(obj_id);
    var li_elem = document.createElement('li');
    var img_e = document.createElement('img');
    var some_href = document.createElement('a');
    var title = document.createElement('h4');
    var price_element = document.createElement('h4');
    title.innerHTML = slider_name;
    price_element.innerHTML = "Price: " + price + "$"
    some_href.href = "#";
    slider_element.appendChild(li_elem);
    img_e.src = slider_image;
    li_elem.appendChild(some_href);
    some_href.appendChild(img_e);
    some_href.appendChild(title);
    some_href.appendChild(price_element);
}

function logout() {
    delete_local_storage();
    window.location.href = '../index.html';
}

function set_total_objects(total) {
    var total_count = document.getElementById('total_count');
    total_count.innerHTML = total.toString() + ' ';
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function add_objects_to_page_html(id, name, price_element, descriere, image_link,
                                  amount, is_in_cart, page, discount, discounted_sum) {
    var father = document.getElementById('market');
    var current_id = random_ids(7), button_id = random_ids(7);
    var disabled = '';
    var button_message = "";
    var cart_function = "";
    var discount_str = '';
    var price_str = '<strong>$ ' + price_element + '</strong>';
    if(discount) {
        discount_str = '<div class="offer-text">' +
                            discount.toString() + '% off here' +
                        '</div>';
        price_str = '<del><strong>$ ' + price_element.toFixed(2) + '</strong></del>  <strong style="color:green;">$' + discounted_sum.toFixed(2) + '</strong>';
    }
    if(!is_in_cart) {
        button_message = 'Add To Cart';
        cart_function = 'onclick = "add_to_cart(' + id.toString() + ', ' + page + ')"'
    }
    else {
        button_message = 'Remove cart';
        cart_function = 'onclick = "remove_from_cart(' + id.toString() + ', ' + page + ')"'
    }
    if(user_type() == 'distribuitor' || !amount) {
        disabled = 'disabled = true'
        button_message = "Unavailable!"
    }
    var stre = '<div class="col-md-4 text-center col-sm-6 col-xs-6" id = ' + current_id + '>' +
                    '<div class="thumbnail product-box">' +
                        discount_str +
                        '<img src=" ' + image_link + '" alt="" style="width:200px;height:162px;" />' +
                            '<div class="caption">' +
                                '<h3><a href="#">' + name + ' </a></h3>' +
                                '<p style="color:red;">Price : ' + price_str + ' </p>' +
                                '<p>Amount : <strong> ' + amount + '</strong>  </p>' +
                                '<p>Description : ' + descriere.slice(0, 10) + "..." + '</p>' +
                                '<p><a class="btn btn-success" ' + cart_function + ' role="button" id = ' + button_id + ' ' + disabled + '> ' + button_message +
                                '</a> <a class="btn btn-primary" onclick = create_description_popup(' + id.toString() + ',"' + descriere.replace(/ /g, '_') + '") role="button">Description</a></p>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
    //console.log(stre);
    buttons.push(button_id);
    ids.push(current_id);
    var element = htmlToElement(stre)
    father.appendChild(element)
}

function number_of_pages(total_pages) {
    var father = document.getElementById('total_pages');
    var current_id = random_ids(7);
    var stre = '<ul class="pagination alg-right-pad" id = ' + current_id + '>';
    stre += '<li><a href="#">&laquo;</a></li>'
    for(var i = 0; i < total_pages; i++) {
        stre += '<li><a onclick = "pager(' + (i + 1).toString() + ')">' + (i + 1).toString() + '</a></li>';
    }
    stre += '<li><a href="#" >&raquo;</a></li>';
    stre += '</ul>'
    ids.push(current_id);
    var element = htmlToElement(stre);
    father.appendChild(element);
}

function remove_ids() {
    for(var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).remove();
    }
    ids = []
    buttons = []
}

function pager(element) {
    get_all_paginated_products(element, 9);
}

function random_ids(nrbs) {
    var stre = '';
    for(var i = 0; i < nrbs; i++) {
        stre += String.fromCharCode(Math.floor(Math.random() * 23) + 97);
    }
    return stre
}

function adds(title, image_src, offer, description, price, discount, discounted_sum) {
    var ads_element = document.getElementById('ads');
    var first_div_box = document.createElement('div');
    var add_div = document.createElement('div');
    var thumbnail_product = document.createElement('div');
    var image = document.createElement('img');
    var caption = document.createElement("div");
    var title_elem = document.createElement("h3");
    var desc = document.createElement("p");

    var price_str = '<strong>$ ' + price + '</strong>';
    if(discount) {
        price_str = '<div><p style="color:red;">Price:  </p><del><strong style="color:red;">$ ' + price.toFixed(2) + '</strong></del><strong style="color:green;">   $' + discounted_sum.toFixed(2) + '</strong></div>';
    }
    var element = htmlToElement(price_str);
    caption.appendChild(element);

    image.src = image_src;
    image.alt = '';
    title_elem.innerHTML = title;
    desc.innerHTML = description;
    ads_element.appendChild(first_div_box);
    first_div_box.className  = 'col-md-12 col-sm-6 col-xs-6';
    caption.className  = 'caption';
    first_div_box.appendChild(add_div);
    add_div.className  = 'offer-text';
    first_div_box.appendChild(thumbnail_product);
    add_div.innerHTML = offer.toString() + "% off here";
    thumbnail_product.className = 'thumbnail product-box';
    thumbnail_product.appendChild(image );
    thumbnail_product.appendChild(caption);
    caption.appendChild(title_elem);
    caption.appendChild(desc);
}