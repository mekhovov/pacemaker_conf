$(document).ready(function(){
    $('#slider').bxSlider({
    	auto: true,
    	pause: 8000,
    	speed: 700,
    	randomStart: true
  	});

  	$('.speakers .photo').adipoli({
    	'startEffect' : 'grayscale',
    	'hoverEffect' : 'normal'
	});

});