
$(document).ready(function(){
  
  // Twitts update
  update_tweets();
  // id = setInterval(update_tweets, 11400);

  Visibility.every(11400, function() {
      update_tweets();
  });
  

});