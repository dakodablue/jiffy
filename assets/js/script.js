  var difJif = ['wheelies', 'rollerblades', 'guitar shred', 'mountaindew', 'extreme', 'surge soda', 'parkour', 'kayak', 'dadhat', 'dad guitar', 'fail', 'ramps', 'gnar'];

  function displayArray(){
  	$('#difJifView').empty();     

    var jifs = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AxG7sB4AUuc32QmFZGEslfExzzW2u9TM&q=" + jifs + "&limit=10&lang=en";

    $.ajax({url: queryURL, method: 'GET'})
       .done(function(response) {
           var results = response.data;

           for(var i=0; i < results.length; i++){
              if (results[i].rating == "r" || results[i].rating == "pg-13")
              {
              }
              else {
                 console.log(response)
               var rating = results[i].rating;

               var p = $('<p>').text( "Rating: " + rating);

               var gifimg = $('<img>'); gifimg.attr('src', results[i].images.fixed_height_still.url);
               gifimg.attr('data-still', results[i].images.fixed_height_still.url);
               gifimg.attr('data-animate', results[i].images.fixed_height.url);
               gifimg.attr('data-state', 'still');
               gifimg.addClass('gifimg');
               $('#difJifView').append(p);
               $('#difJifView').append(gifimg);
                }
           }
      $('.gifimg').on('click', function(){
        var state = $(this).attr('data-state'); 
            console.log(state);
             if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
      });
      });   
  }
  function renderButtons(){ 
    $('#buttons').empty();

    // Loops through the array of difJif
    for (var i = 0; i < difJif.length; i++){
        var a = $('<button>') 
        a.addClass('jifStyle'); // Added a class 
        a.addClass("btn btn-success"); // Added a class 
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', difJif[i]); // Added a data-attribute
        a.text(difJif[i]); // Provided the initial button text
        $('#buttons').append(a); // Added the button to the HTML
    }
  }

  // ========================================================

  // This function handles events where one button is clicked
  $('#newSearch').on('click', function(){
  	var jif = $('#jiffyRender').val().trim();
    difJif.push(jif);
    renderButtons();
    return false;
  })

  // ========================================================

  // Generic function for displaying the cartoonInfo
  $(document).on('click', '.jifStyle', displayArray);


  // ========================================================

  // This calls the renderButtons() function
  renderButtons();
  //displayArray();
