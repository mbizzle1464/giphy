var tvShows = ["VANDERPUMP RULES", "BACHELOR IN PARADISE", "SOUTH PARK", "CATFISH", "MODERN FAMILY", "RENO 911", "KEY AND PEELE"];   
var currentGif,
    pausedGif, 
    animatedGif, 
    stillGif;   



// creates Buttons 
function renderButtons() {
    // Deleting the buttons prior to adding new tvShows
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < tvShows.length; i++) {
        // Then dynamicaly generating buttons for each tvShows in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>) 
        var showBtn = $("<button>");
        // Adding a class of movie to our button
        showBtn.addClass("showBtn");
        // Adding a data-attribute
        showBtn.attr("data-name", tvShows[i]);
        // Providing the initial button text
        showBtn.text(tvShows[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(showBtn);
        
    }
    // display gifs on click 
    $('.showBtn').on('click', function () {
        $('.display').empty();

        var baseURL = "http://api.giphy.com/v1/gifs/search?&q=tv+show+";
        var thisShow = $(this).attr('data-name');
        var params = "&limit=12";   
        var APIKey = "&api_key=yTrK5avjcqnYqEihaFaYLBpUIXGX7M4o";
        var giphyURL = baseURL + thisShow + params + APIKey;


        $.ajax({
            url: giphyURL,
            method: "GET"
        }).done(function (giphy) {
            console.log(giphy.data);  
            currentGif = giphy.data;

            $.each(currentGif, function (index, value) {
                animatedGif = value.images.original.url;
                pausedGif = value.images.original_still.url;    
                var thisRating = value.rating;
                var dataState = "still";    
                //gives blank ratings 'unrated' text
                if (thisRating === '') {
                    thisRating = 'unrated';
                }
                var rating = $('<h5>').html('Rated: ' + thisRating.toUpperCase()).addClass('ratingStyle');
                stillGif = $('<img>').attr('data-state', dataState).attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnClick').addClass('gif').addClass('img-responsive');
                var fullGifDisplay = $('<button>').append(rating, stillGif);
                $('.display').append(fullGifDisplay);
                 
            });
        })
    });
}



//animates and pauses gif on click and mousehover
$(document).on('click', '.playOnClick', function () {
    var state = $(this).attr('data-state')
    console.log(state);  
    if (state === "still") {
        $(this).attr('src', $(this).attr("data-animated"));
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr('src', $(this).attr("data-paused"));
        $(this).attr("data-state", "still")
    }

    //$(this).attr('src', $(this).data('animated'));
});

// This function handles events where one button is clicked
$("#addShow").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newShow = $("#newShowInput").val().trim();
    // The movie from the textbox is then added to our array
    tvShows.push(newShow.toUpperCase());
    $("#addShow").empty()
    renderButtons();
 
}); 

    // Calling renderButtons which handles the processing of our tvShows array
 renderButtons();

