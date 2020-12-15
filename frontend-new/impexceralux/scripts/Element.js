function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
  }
  return params;
}

function loadImage(photo) {
  var path = "../date_impexcera/";
  var parent = document.getElementById('portfolio');
  var newElement = "<img class='left-element' style = 'left: 250px; position: relative' width='500' height='333' src=" + path + photo + " alt='Cinque Terre'>";
  parent.appendChild(createElementFromHTML(newElement));
}

function loadTitle(title) {
  document.getElementById('title').innerHTML = capitalizeFirstLetter(title);
}

function loadData(title) {
  var parent = document.getElementById('portfolio');
  var newElement = "<div style = 'position: absolute;' class='right-element' alt='Cinque Terre'>DADADADA</div>";
  parent.appendChild(createElementFromHTML(newElement));
}

function getElement() {
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/getElementByID?id=' + getSearchParameters()['id'],
    data: {},
    success: function( data ) {
      loadImage(data['record']['img']);
      loadTitle(data['record']['categorie']);
      loadData("DADADA");
    },
    dataType: 'json'
  });
}

getElement();