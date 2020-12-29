const path = "../date_impexcera/";
var offsetTop = 0;
var offsetLeft = 0;

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

function createSliderDivs(photo,i) {
  var block = "block";
  if (i>1)block ="none";
  var htmlElement = "<div class = 'mySlides' style='display:"+block+";'>" +
                    " <img src=../date_impexcera/" + photo + " style='height:700px; width:100%'>" +
                    "</div>";
  var element = createElementFromHTML(htmlElement);
  return element;
}

function loadPresentationImages(photos) {
  var parent = document.getElementById('prezentare');
  var parent2 = document.getElementById('dots');
  var dots ="";
  for(i=0;i<photos.length;i++){
    if (!i)dots = "<span class='mydot active' onclick='currentSlide("+(i+1).toString()+")'></span> "
    else dots = "<span class='mydot' onclick='currentSlide("+(i+1).toString()+")'></span> "
    parent.appendChild(createSliderDivs(photos[i],i+1));
    parent2.appendChild(createElementFromHTML(dots));
  }
  //var buttons = "<a class='myprev' onclick='plusSlides(-1)'>"+"&#10094;"+"</a>"+"<a class='mynext' onclick='plusSlides(1)'>"+"&#10095;"+"</a>"
  //parent.appendChild(createElementFromHTML(buttons));
  //console.log(dots)
  //console.log(createElementFromHTML(dots));
}

function loadImage(photo) {
  var parent = document.getElementById('portfolio');
  var newElement = createElementFromHTML("<img id=img1 src=" + path + photo + " >");
  parent.appendChild(newElement);
  getFormatedStyle(photo);
}

function loadTitle(title) {
  document.getElementById('title').innerHTML = capitalizeFirstLetter(title);
}
function loadDescription(description) {
  document.getElementById('descriere').innerHTML = capitalizeFirstLetter(description);
}

function createPlaci(photo, nume, culoare, dimensiune,i){
  var color = "";
  if(!(culoare === "" || culoare === "null" || culoare === null)){
    color = "<p style='color:black'>Culoare: " + culoare + "</p>";
  }
  var htmlStuff = "<div class='col-md-4 col-sm-4 col-xs-12' style='width: 350px; height:150px margin-right: 20px;'><div class='service-widget' >"+
                      "<div class='post-media wow fadeIn'>"+
                          "<a target='_blank rel='noopener noreferrer' href='"+path+photo+"' data-rel='prettyPhoto[gal]' class='hoverbutton global-radius'><i class='flaticon-unlink'></i></a>"+
                          "<img id='plm' src='"+path+photo+"' alt='' style='height:320px; width: 320px;'>"+
                      "</div>"+
                      "<div class='service-dit'>"+
                          "<h3>"+nume+"</h3>"+
                          color+
                          "<p style='color:black'>Dimensiune: " + dimensiune + " cm</p>"+
                      "</div>"+
                      "</div>"+
                  "</div>"
    if (i % 3 === 2){
      htmlStuff += "</div>";
    }
    return htmlStuff;
  }


  function loadData(data) {
    var parent = document.getElementById('placi');
    var elemente = data['elemente'];
    var colectie = data['colectie'];
    var htmlStuff = "";
    var ok = 0;
    var photo = "alladin-bl.jpg";//just for testing
    /// sa-mi bag pula in familia lui de template
    if(elemente.length==1){
      var nume = elemente[0]['categorie']+" "+ colectie+" "+elemente[0]['id'];
      if(elemente[0]['img']){
        photo = elemente[0]['img'];
        console.log(photo);
      }
      else{
        photo = "alladin-bl.jpg";
      }
      var culoare = elemente[0]['culoare'];
      var dimensiune = elemente[0]['dimensiuni'];
      htmlStuff+="<div class='row text-center'>"+createPlaci(photo,nume,culoare,dimensiune,0)+"</div>";
      parent.appendChild(createElementFromHTML(htmlStuff));
    }
    else{
      for( i=0;i<elemente.length;i++){
        var nume = elemente[i]['categorie']+" "+ colectie+" "+elemente[i]['id'];
        //if(elemente[i]['img']!="null"||elemente[i]['img']!=null){
        console.log(elemente.length);
        if(elemente[i]['img']){
          photo = elemente[i]['img'];
          console.log(photo);
        }
        else{
          photo = "alladin-bl.jpg";
        }
        var culoare = elemente[i]['culoare'];
        var dimensiune = elemente[i]['dimensiuni'];
        if(i%3==0){
          htmlStuff+="<div class='row text-center'>"+createPlaci(photo,nume,culoare,dimensiune,i);
        }
        else{
          htmlStuff+=createPlaci(photo,nume,culoare,dimensiune,i);
        }
        ok=i;
        if(ok%3==2){
          console.log(htmlStuff);
          parent.appendChild(createElementFromHTML(htmlStuff));
          parent.appendChild(createElementFromHTML("<hr class='invis'>"));
          ok=0;
          htmlStuff="";
        }
      }
      if(ok%3!=2){
        htmlStuff+="</div>";
      }
      console.log(htmlStuff);
      if(ok && elemente.length!=1){
        parent.appendChild(createElementFromHTML(htmlStuff));
        parent.appendChild(createElementFromHTML("<hr class='invis'>"));
      }
    }
}

  function getElement() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/getElementByID?id=' + getSearchParameters()['id'],
      data: {},
      success: function( data ) {
        loadPresentationImages(data['record']['img']);
        //loadImage(data['record']['img']);
        loadTitle(data['record']['colectie']);
      loadDescription(data['record']['descriere']);
      loadData(data['record']);
    },
    dataType: 'json'
  });
}
getElement();


/*
BULSHITAREALA PENTRU SLIDESHOW
*/
var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("mydot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
/*
END OF THIS SHIT
*/

//showSlides(slideIndex);