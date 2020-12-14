const per_page = 20;
let numberOfPages = 0;

function createMagElement(photo, titlu, id) {
  var htmlElement = "<div class='gallery' id = el_" + id.toString() + ">" +
                    " <a target='_blank' href=../date_impexcera/" + photo + ">" +
                    "   <img src=../date_impexcera/" + photo + " alt='Cinque Terre'>" +
                    " </a>" +
                    "<div class='descr'>" + titlu + "</div>";
  var element = createElementFromHTML(htmlElement);
  return element;
}

function addElement(photo, titlu, id) {
  var parent = document.getElementById('elements');
  parent.appendChild(createMagElement(photo, titlu, id));
}

function createPaginations(number) {
  var parent = document.getElementById('pagi');
  for(var i = 0; i < number; i++) {
    const ci = i.toString();
    var element = createElementFromHTML('<a onclick = "return changePag(' + ci + ')" id = pag_' + ci + '>' + ci + '</a>');
    parent.appendChild(element);
  }
  parent.appendChild(createElementFromHTML("<a id = finish_pag>&raquo;</a>"))
}

function deleteElements() {
  for(var i = 0; i < per_page; i++) {
    var elements = document.getElementById('el_' + i.toString());
    if(elements) {
      elements.remove();
    }
  }
}

function changePag(id) {
  deleteElements();
  populateElements(id + 1, per_page);
  return false;
}

function populateElements(page, per_page) {
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/elements?page=' + page.toString() + '&per_page=' + per_page.toString(),
    data: {},
    success: function( data ) {
      numberOfPages = data['pages'];
      for(var i = 0; i < data['elements'].length; i++) {
        addElement(data['elements'][i]['img'], data['elements'][i]['categorie'] + " " + data['elements'][i]['culoare'], i);
      }
    },
    dataType: 'json'
  });
}

$.ajaxSetup({async: false});
populateElements(1, per_page);
createPaginations(numberOfPages);
$.ajaxSetup({async: true});