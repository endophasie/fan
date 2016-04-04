

function stopPage(e) {
	e.preventDefault();
	$('body').addClass('is-stop');
}

function hidePopup(e) {
	var popup = $('.js-popup');
	e.preventDefault();
    popup.addClass('is-hidden');
    $('body').removeClass('is-stop');
}

function menu() {
	var menu       = $('.js-main-menu');
	var openNav    = $('.js-menu-icon');
	var menuClose  = $('.js-menuClose');
	var scrollLink = $('.js-scroll-link');

	function hideMenu() {
		var menu   = $('.js-main-menu');

		menu.addClass('is-hidden');
		$('body').removeClass('is-stop');
	}

	openNav.on('click', function(e) {
		e.preventDefault();

		menu.removeClass('is-hidden');
		$('body').addClass('is-stop');
	});

	menuClose.on('click', hideMenu);

	// navigation
	scrollLink.on('click', function(e) {
		var anchor = $(this).attr('href');

		e.preventDefault();

		$('html, body').animate({
            scrollTop: $(anchor).offset().top + 'px',
            easing: 'swing'
        }, 700, hideMenu);
	});

}

function formContact() {
	var callLink  = $('.js-callLink');
	var menuIcon  = $('.js-menu-icon');
	var callForm  = $('.js-call-form');
	var pageBody  = $('.page-body');
	var formClose = $('.js-formClose');

	callLink.on('click', function(e) {

		menuIcon.addClass('is-hidden');
		callForm.removeClass('is-hidden');
		pageBody.addClass('is-moved');
		stopPage(e);
	});

	formClose.on('click', function(e) {
		menuIcon.removeClass('is-hidden');
		callForm.addClass('is-hidden');
		$('.form_popup').removeClass('is-shown');
		pageBody.removeClass('is-moved');
		$('body').removeClass('is-stop');

		e.preventDefault();
	});

	$('#feedback-form').on('submit', function(e) {
		var data = $(this).serializeArray().concat([{name: 'action', value: 'fancystate_feedback'}]);
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: ajaxUrl,
			data: data,
			success: function(response) {
				$('.form_popup').addClass('is-shown');
			},
			error: function(error) {
				$('.form_message').text(error.text);
			}
		});
	});
}

function popup() {
	var playLink   = $('.js-playblock').find('.playblock_btn');
	var popupClose = $('.js-popup-close');

	playLink.on('click', function(e) {
		var popup  = $(anchor);
		var anchor = $(this).attr('href');

		e.preventDefault();
		popup.removeClass('is-hidden');
		$('body').addClass('is-stop');
	})

	popupClose.on('click', hidePopup);


	// in some reason Vimeo API doesn't work as intended so I made this ugly dirty hack
	var iframe  = document.getElementById('video1');
	var iframe2 = document.getElementById('video2');
	// $f == Froogaloop
	var player = $f(iframe);
	var player2 = $f(iframe2);

	var pauseButton  = document.getElementById('pause-button1');
	var pauseButton2 = document.getElementById('pause-button2');

	pauseButton.addEventListener('click', function() {
		player.api('pause');
	});
	pauseButton2.addEventListener('click', function() {
		player2.api('pause');
	});

}

window.onload = function() {

    var mapBox = document.getElementById('map');

    if( mapBox ) {
        initialize();
    }

    function initialize() {
        var latlng    = new google.maps.LatLng(55.7573978, 37.6458239);
        var myOptions = {
            zoom: 17,
            scrollwheel: false,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            styles: [{'stylers':[{'hue':'#ff1a00'},{'invert_lightness':true},{'saturation':-100},{'lightness':33},{'gamma':0.5}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#2D333C'}]}]
        }
        var map    = new google.maps.Map(mapBox, myOptions);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'build/img/ic-location.svg'
        });
    }
}

$(document).ready(function() {

	$('#slider').owlCarousel({
		itemsCustom : [
	        [0, 3],
	        [450, 4],
	        [600, 6],
	        [700, 7],
	        [1000, 9],
	        [1200, 10]
	      ],
		slideSpeed : 400,
		pagination : false,
		navigation : true
	});

	if(document.body.clientWidth < 700) {
		$('#bgvid').attr('autoplay', false);
	}

	$(document).on('keydown', function(e) {
		var pageBody = $('.page-body');

        if (e.which == 27) {
        	hidePopup();
            pageBody.removeClass('is-moved');
        }
    });

	menu();
	formContact();
	popup();

});


