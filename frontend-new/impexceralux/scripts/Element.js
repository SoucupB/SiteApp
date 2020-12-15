const path = "../date_impexcera/";
var offsetTop = 0;
var offsetLeft = 0;
var magnified = 0;
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

function getFormatedStyle(photo) {
  console.log(window.innerWidth, window.innerHeight)
  var img = new Image();
  img.src = path + photo;
  img.id = 'ana';
  img.onload = function () {
    var imge = document.getElementById('img1');
    var newHeight = Math.min(500, img.height), newWidth= Math.min(500, img.width);
    var newPosition = Math.floor(window.innerWidth / 2) - Math.floor(newWidth / 2);
    imge.style = 'left: ' + newPosition + 'px; height: ' + newHeight + 'px; width: ' + newWidth + 'px;';
   // imge.style = 'position: relative; left: ' + newPosition + 'px; height: ' + newHeight + 'px; width: ' + newWidth + 'px;';
    var topPosition = imge.getBoundingClientRect().top - document.getElementById('portfolio').getBoundingClientRect().top;
   // offsetTop = newPosition;
    offsetLeft = Math.floor(topPosition / 2);
  };
}

function activateMagnifier() {
  if(!magnified) {
    magnify('img1', 2, offsetTop, offsetLeft);
    magnified = 1;
  }
  return false;
}

function loadImage(photo) {
  var parent = document.getElementById('portfolio');
  var newElement = createElementFromHTML("<img id=img1 src=" +
                                         path + photo + " >");
  parent.appendChild(newElement);
  getFormatedStyle(photo);
}

function loadTitle(title) {
  document.getElementById('title').innerHTML = capitalizeFirstLetter(title);
}

function loadData(data) {
  document.getElementById('0').innerHTML = data['id']
  document.getElementById('1').innerHTML = data['categorie']
  document.getElementById('2').innerHTML = data['culoare']
  document.getElementById('3').innerHTML = data['dimensiuni']
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/getElementByID?id=' + data['ColectionID'],
    data: {},
    success: function( record ) {
      console.log(record)
      document.getElementById('4').innerHTML = record['record']['colectie']
    },
    dataType: 'json'
  });
}

function getElement() {
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/getElementByID?id=' + getSearchParameters()['id'],
    data: {},
    success: function( data ) {
      loadImage(data['record']['img']);
      loadTitle(data['record']['categorie']);
      loadData(data['record']);
    },
    dataType: 'json'
  });
}

getElement();