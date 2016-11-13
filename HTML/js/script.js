$(function(){

  // $.ajax();  <<< CORE METHOD
  // $('').load();
  // $.get();
  // $.post();
  // $.getScript();
  // $.getJSON();
  callPage('#home')

 $(document.body).on('click', '.page' , function(e){
    e.preventDefault();
    var pageRef = $(this).find('a').attr('href');
    callPage(pageRef)

  });

 
  function callPage(pageRefInput){
    var pageName = pageRefInput.split("#");
    pageName = pageName[1]+".html";

    $.ajax({
        url: pageName,
        type: "GET",
        dataType : 'text',
        success: function( response ) {
          $('#content').html(response);
          draw('LR');
          draw('NN');
        },
        error: function( error ) {
          console.log('Error loading page', error);
        },
        complete: function( xhr, status ) {
          console.log("Request complete");
        }
    });    
  }



});