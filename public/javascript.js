$(document).ready(function(){
	// Enables popovers
	//
	$(function () {
	  //$('[data-toggle="popover"]').popover()
	})

	// Enables scrollspy and offsets
	//
	//$('body').scrollspy({ target: '#navbar-sections', offset: 80 })

	// Offets anchors
	//
	var offset = 80;

	$('.navbar li a').click(function(event) {
		event.preventDefault();
		$($(this).attr('href'))[0].scrollIntoView();
		scrollBy(0, -offset);
	});
});

