$( function() {

  var $container = $('.isotope').isotope({
    masonry: {
      columnWidth: 80
    }
  });

  $(".caption").on('click', function(event) {
	event.preventDefault();
	event.stopPropagation();
	var href = $('a', this).attr('href');
	window.open(href, '_blank');
  });

  $container.on( 'click', '.item-content', function() {
    $( this ).parent('.item').toggleClass('is-expanded');
    var new_image = $(this).data('img');
    var old_image = $('img', this).attr('src');
    $(this).data('img', old_image);
    if ($('img', this).hasClass('face')) {
		$('.caption', this).toggle();
    }
    $(this).fadeOut(800, function() {
		if ($('img', this).hasClass('eye')) {
			$('.caption', this).toggle();
			$('img', this).attr('title', "don't shut me out...");
		} else {
			$('img', this).attr('title', "please, let me in...");
		}
		$('img', this).attr('src', new_image).toggleClass('eye').toggleClass('face');
		$(this).fadeIn(800);
		
	});
	$container.isotope('layout');

  });

  setInterval(function () {
	var id = Math.floor((Math.random()*84)+1);
	console.log(id);
	if ($('#item-' + id + ' > img').hasClass('eye')) {
		$('#item-' + id).fadeToggle(800);
	}
  }, 1000);
  
});