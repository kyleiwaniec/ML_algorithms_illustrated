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

  var scatterLR = [
    {x1:5.5,x2:98,y:0},
    {x1:5.8,x2:120,y:0},
    {x1:6.2,x2:168,y:0},
    {x1:5.5,x2:200,y:1},
    {x1:5,x2:210,y:1},
    {x1:5,x2:168,y:1}
  ]
  var scatterNN = [
    {x1:5.5,x2:98,y:0},
    {x1:5.2,x2:155,y:0},
    {x1:5.7,x2:120,y:0},
    {x1:6.2,x2:168,y:0},
    {x1:5.5,x2:200,y:1},
    {x1:5,x2:210,y:1},
    {x1:5,x2:168,y:1},
    {x1:6.0,x2:110,y:1},
    {x1:5.8,x2:125,y:1}
  ]

  function callPage(pageRefInput){
    var pageName = pageRefInput.split("#");
    pageName = pageName[1]+".html";

    $.ajax({
        url: pageName,
        type: "GET",
        dataType : 'text',
        success: function( response ) {
          $('#content').html(response);
          scatter('ScatterLR',scatterLR);
          scatter('ScatterNN',scatterNN);
          draw('LR',[2,1]);
          draw('NN',[2,3,1]);
          setTimeout(function(){
              MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }, 1);
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