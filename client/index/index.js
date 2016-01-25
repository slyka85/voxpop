if (Meteor.isClient) {

	Template.mainNav.onCreated(function(){
			;(function () {

					'use strict';

		  // OffCanvass
		  var offCanvass = function() {
		  	$('body').on('click', '.js-fh5co-menu-btn, .js-fh5co-offcanvass-close', function(){
		  		$('#fh5co-offcanvass').toggleClass('fh5co-awake');
		  	});
		  };

		  // Click outside of offcanvass
		  var mobileMenuOutsideClick = function() {
		  	$(document).click(function (e) {
		  		var container = $("#fh5co-offcanvass, .js-fh5co-menu-btn");
		  		if (!container.is(e.target) && container.has(e.target).length === 0) {
		  			if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
		  				$('#fh5co-offcanvass').removeClass('fh5co-awake');
		  			}
		  		}
		  	});

		  	$(window).scroll(function(){
		  		if ( $(window).scrollTop() > 500 ) {
		  			if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
		  				$('#fh5co-offcanvass').removeClass('fh5co-awake');
		  			}
		  		}
		  	});
		  };

		  $(function(){
		  	offCanvass();
		  	mobileMenuOutsideClick();
		  });


		}());
	})

}

if (Meteor.isServer) {

}