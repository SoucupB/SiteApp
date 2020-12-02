function createHtmlImage(id) {
    let stre = '<div id=' + '"id_'+ id.toString() + '"' + ' + class="post-media pitem item-w1 item-h1 cat1">' +
               '    <a href="uploads/portfolio_07.jpg" data-rel="prettyPhoto[gal]">' +
               '        <img src="uploads/portfolio_07.jpg" alt="" class="img-responsive">' +
               '        <div>' +
               '            <h3>Admin Dashboard <small>Admin Template MURRRR</small></h3>' +
               '            <i class="flaticon-unlink"></i>' +
               '        </div>' +
               '    </a>' +
               '</div';
    console.log(stre);
    return createElementFromHTML(stre);
}

let container = document.getElementById("da-thumbs")
for(var i = 0; i < 200; i++) {
    var element = createHtmlImage(i);
    console.log(element);
    container.appendChild(element);
}
console.log(container);