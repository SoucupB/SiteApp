function populateCheckboxes(email, desc) {
  console.log("DADADA");
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/sendEmail?email=' + email + "&description=" + desc,
    data: {},
    success: function( data ) {
      console.log("Email sent");
    },
    dataType: 'json'
  });
  return false;
}