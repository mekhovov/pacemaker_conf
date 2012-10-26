
var t = {};
var new_t = {};
var now_date = new Date();


String.prototype.parseURL = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
    return '<a href="' + url + '" target="_blank">' + url + '</i></a>';
  });
};

String.prototype.parseUsername = function() {
  return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
    var username = u.replace("@","")
    return '<a href="' + 'http://twitter.com/' +username + '" target="_blank">' + u + '</i></a>';
  });
};

String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    var tag = t.replace("#","%23")
    return t.link("http://search.twitter.com/search?q="+tag);
  });
};


function update_tweets () {
    var bexit = false;

  $.get('/t', function(data) {
    posts = $.parseJSON(data);
    old_t = {};
    for(var k in t) {
      if(t[k].pnew == false){
        old_t[k] = t[k];
        old_t[k].pnew = false
      }; 
    }

    t = {};
    for(var k in posts) {
        posts[k].pnew = true;
        t[k] = posts[k];
      };
    
    for(var k in old_t) {
      if(old_t[k].pnew == false){
        t[k].pnew = false
      }; 
    }

    $.each(t, function(key, post) {
      if(post.pnew == true && bexit == false){
          t[key].pnew = false;
          bexit = true;
          $('.twits').fadeOut('slow', function() {

          var post_date = new Date(key.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));
          user_post = post.msg.parseURL().parseUsername().parseHashtag();
            if ( post_date > now_date ) {
              $('.twits').addClass('alert-success');  
            } else {
              $('.twits').removeClass('alert-success');  
            }
            $('.twits .pht img').attr({src: post.photo});  
            $('.twits .post p').html('<strong><a href="http://twitter.com/' + post.author + '" target="_blank">' + post.user + "</a>:</strong> " + user_post + "<br><em>(" + $.timeago(key) + ")</em>");  
          $('.twits').fadeIn('slow', function() {
          });       
        });
      };
    });
  });
}



$(document).ready(function(){

  // Slider
  $('#da-slider').cslider({
    autoplay  : true,
    interval  : 6000,
    bgincrement : 0
  });

  // Speakers photos
	// $('.speakers .photo').adipoli({
 //  	'startEffect' : 'grayscale',
 //  	'hoverEffect' : 'normal'
 //  });

  // Ribbons
  $('.ribbon_inactive').adipoli({
    'startEffect' : 'grayscale',
    'hoverEffect' : 'normal'
  });

  // Twitts update
  // update_tweets();
  // id = setInterval(update_tweets, 11400);

  // Visibility.every(11400, function() {
  //     update_tweets();
  // });
  

});