$(document).ready(function() {
	var fadeSpeed = 550;	// speed
	var autoSlider = true; 	// autoswitch
	var autoSliderSpeed = 3900; 	// autoswitchspeed

	// Starting active class
	$(".slide").first().addClass("active");

	// Hide slides that are not currently displayed
	$(".slide").hide();

	// Show the first slide
	$(".active").show();

	// Configure buttons to transition to different images
	$("#next").on("click",transitionNext);

	$("#prev").on("click", transitionPrev);

	if(autoSlider === true) {
		setInterval(transitionNext, autoSliderSpeed);
	}

	// Transition to next slides
	function transitionNext() {
		$(".active").removeClass("active").addClass("oldActive");
		if ($(".oldActive").is(":last-child")) {
			$(".slide").first().addClass("active");
		} else {
			$(".oldActive").next().addClass("active");
		}

		$(".oldActive").removeClass("oldActive");
		$(".slide").fadeOut(fadeSpeed);
		$(".active").fadeIn(fadeSpeed);
	}

	function transitionPrev() {
		$(".active").removeClass("active").addClass("oldActive");
		if($(".oldActive").is(":first-child")) {
			$(".slide").last().addClass("active");
		} else {
			$(".oldActive").prev().addClass("active");
		}

		$(".oldActive").removeClass("oldActive");
		$(".slide").fadeOut(fadeSpeed);
		$(".active").fadeIn(fadeSpeed);
	}

});