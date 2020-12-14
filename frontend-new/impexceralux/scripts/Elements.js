const per_page = 15;
let numberOfPages = 0;
let idMaps = {};
let totalCheckerIds = [];
var filters = null;
var lastPaginationIndex = 1;

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
    const ci = (i + 1).toString();
    var element = createElementFromHTML('<a onclick = "return changePag(' + ci + ')" id = pag_' + ci + '>' + ci + '</a>');
    parent.appendChild(element);
  }
  parent.appendChild(createElementFromHTML("<a id = finish_pag>&raquo;</a>"))
}

function deletePagination(number) {
  for(var i = 0; i < number; i++) {
    var elements = document.getElementById('pag_' + (i + 1).toString());
    if(elements) {
      elements.remove();
    }
  }
  document.getElementById('finish_pag').remove();
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
  populateElements(id, per_page);
  activatePage(id);
  return false;
}

function activatePage(page) {
  document.getElementById('pag_' + lastPaginationIndex).removeAttribute("class");
  document.getElementById('pag_' + page).setAttribute("class", "active");
  lastPaginationIndex = page;
}

function createCheckboxLine(title, id, idPrefix) {
  let c_id = idPrefix + '_' + id.toString();
  idMaps[c_id] = idPrefix;
  totalCheckerIds.push(c_id);
  var htmlChecker = '<div><input id = ' + c_id + ' type="checkbox" name="startingReserves" value="starting" id="starting"><label id = _' + c_id + ' for="starting">'
                     + title + '</label></div>';
  return createElementFromHTML(htmlChecker);
}

function createFilterString(filters) {
  var stre = "";
  if(filters === null) {
    return stre;
  }
  for(var i = 0; i < filters.length; i++) {
    stre += "&" + filters[i][0] + "[]=" + filters[i][1];
  }
  return stre;
}

function populateElements(page, per_page) {
  const url = 'http://localhost:3000/elements?page=' + page.toString() + '&per_page=' + per_page.toString() + createFilterString(filters);
  $.ajax({
    type: "GET",
    url: url,
    data: {},
    success: function( data ) {
      numberOfPages = data['pages'];
      for(var i = 0; i < data['elements'].length; i++) {
        addElement(data['elements'][i]['img'], data['elements'][i]['categorie'] + " " + data['elements'][i]['culoare'], i);
      }
    },
    dataType: 'json'
  });
  console.log(url);
}

function addTitle(title) {
  var checkers = document.getElementById('checkboxes');
  var htmlChecker = '<h2>' + title + '</h2>';
  checkers.appendChild(createElementFromHTML(htmlChecker));
}

function getAllSelectedData() {
  var selectedData = [];
  for(var i = 0; i < totalCheckerIds.length; i++) {
    let element = document.getElementById(totalCheckerIds[i]);
    if(element.checked === true) {
      selectedData.push([idMaps[totalCheckerIds[i]], document.getElementById('_' + totalCheckerIds[i]).innerHTML]);
    }
  }
  return selectedData;
}

function populateCheckboxes(atr) {
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/elementsAttrs?atr=' + atr,
    data: {},
    success: function( data ) {
      var checkers = document.getElementById('checkboxes');
      for(var i = 0; i < data['records'].length; i++) {
        checkers.appendChild(createCheckboxLine(data['records'][i], i, atr));
      }
    },
    dataType: 'json'
  });
}

function searchFilterData() {
  var selData = getAllSelectedData();
  filters = selData;
  if(selData.length === 0) {
    filters = null;
  }
  deleteElements();
  deletePagination(numberOfPages);
  populateElements(1, per_page);
  createPaginations(numberOfPages);
  activatePage(1);
  return false;
}

$.ajaxSetup({async: false});
populateElements(1, per_page);
createPaginations(numberOfPages);
addTitle('Dimensiuni');
populateCheckboxes('dimensiuni');
addTitle('Culoare');
populateCheckboxes('culoare');
activatePage(1);