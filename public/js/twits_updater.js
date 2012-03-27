
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
    $('#loading').fadeIn('slow', function() {   });

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
          var post_date = new Date(key.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1'));
          user_post = post.msg.parseURL().parseUsername().parseHashtag();
            
            var new_p = 'alert';
            if ( post_date > now_date ) {
              new_p ='alert-success';  
            };


            $('#container #loading').after('<article class="t '+ new_p +'" id="' + key +'" style="display:none">'
            + '<div class="twits"><div class="twits">'
            +    '<div class="row">'
            +  '<div class="span2 pht">'
            +        '<img class="thumbnail" src="'+ post.photo.replace(/_normal/, '') +'"> </img>'
            +      '</div>'
            +      '<div class="span9 post">'
            + '<span class="author"><a href="http://twitter.com/' + post.author + '" target="_blank">' + post.user + '</a>:</span> ' + user_post + '<br><span class="time"><em>(' + $.timeago(key) + ')</em></span>'
            +      '</div>'
            +    '</div></div></article>');

      };
      
      $('#container > .t').slideDown('slow', function() {   });
      $('#loading').fadeOut('slow', function() {   });
    });
  });
}