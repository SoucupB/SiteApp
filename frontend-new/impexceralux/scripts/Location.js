var mapApiQuery =
{
  "Cluj": "https://maps.google.com/maps?q=impexcera%20cluj&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "Bucuresti": "https://maps.google.com/maps?q=impexcera%20bucuresti&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "Sibiu": "https://maps.google.com/maps?q=impexcera%20sibiu&t=&z=13&ie=UTF8&iwloc=&output=embed"
};

function alliniateMiddle() {
  let w = window.innerWidth;
  $('.map-pointer').each(function() {
    let startWidth = Math.max(0, w / 2.0 - $(this).width() / 2.0);
    let stW = (startWidth / w * 100).toString()
    $(this).css({left: stW + '%'})
    $('.map-pointer-test').each(function() {
      $(this).css({left: stW + '%'})
      let selector = $("#selected");
      let offsetPosition = $(this).offset().top + $(this).height() / 2.0 - selector.height() / 2.0;
      console.log("DA", offsetPosition);
      selector.css({left: Math.max(0, startWidth) + $(this).width(), top: offsetPosition - 4})
    })
  })
}

function loader() {
  if($('#framer')) {
    $('#framer').remove();
  }
  var mapPElement = $('.map-pointer');
  var height = mapPElement.height();
  var width = mapPElement.width();
  var top = mapPElement.offset().top;
  var left = mapPElement.offset().left;
  var stre = "<iframe style = 'position: absolute; height:" + height.toString() + "px; width:" + width.toString() + "px;' id = 'framer' frameBorder='0' src='roundingButton.html'></iframe>";
  document.getElementById('frm').appendChild(createElementFromHTML(stre))
  $('#framer').css({top: top, left: left})
}

function createMap(position) {
  var map = '<div id = "mapgfg" class="mapouter map-pointer">' +
            ' <div style = "position: relative;" class="gmap_canvas"><iframe width="1200" height="500" id="gmap_canvas" src="' + position + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://fmovies2.org">fmovies to review</a></div>' +
            ' <style>.mapouter{position:relative;text-align:right;height:500px;width:1200px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:1200px;}</style>' +
            '</div>';
  document.getElementById('maps').appendChild(createElementFromHTML(map));
  return true;
}

function selectLocality() {
  if($('#mapgfg')) {
    $('#mapgfg').remove();
  }
  var element = document.getElementById('selected').value;
  createMap(mapApiQuery[element])
  alliniateMiddle();
  return false;
}
$.ajaxSetup({async: false});
selectLocality();
alliniateMiddle();
loader();

window.addEventListener('resize', alliniateMiddle);
window.addEventListener('resize', loader);