function regulateButtons() {
  var elements = 0;
  var totalSize = 0;
  var w = window.innerWidth;
  var buttonsCounter = $('.btn-load').length;
  $('.btn-load').each(function() {
    var newID = 'crt_' + elements.toString();
    this.id = newID;
    elements++;
    return this.innerHTML;
  });
  elements = 0;
  $('.btn-load').each(function() {
    var newID = 'crt_' + elements.toString();
    totalSize += $("#" + newID).width()
    elements++;
  });
  var initialStart = w / 2 - totalSize / 2 - 10 * (buttonsCounter - 1);
  console.log(totalSize, initialStart);
  elements = 0;
  var currentPosition = initialStart;
  $('.btn-load').each(function() {
    var newID = 'crt_' + elements.toString();
    var element = $("#" + newID);
    element.css({position: 'absolute', left: currentPosition + 'px', top: "-59px"})
    currentPosition += element.width() + 10;
    elements++;
  });
}

window.addEventListener('resize', regulateButtons);