window.onload = function() {

	// media
	var media = document.getElementById("media");

	// Buttons
	var playButton = document.getElementById("play-pause");
	var muteButton = document.getElementById("mute");
	//var fullScreenButton = document.getElementById("full-screen");

	// Sliders
	var seekBar = document.getElementById("seek-bar");
	var volumeBar = document.getElementById("volume-bar");


	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
		if (media.paused == true) {
			// Play the media
			media.play();

			// Update the button text to 'Pause'
			playButton.innerHTML = '&#x2016';
		} else {
			// Pause the media
			media.pause();

			// Update the button text to 'Play'
			playButton.innerHTML = '&#x25BA';
		}
	});


	// Event listener for the mute button
	muteButton.addEventListener("click", function() {
		if (media.muted == false) {
			// Mute the media
			media.muted = true;

			// Update the button text
			muteButton.innerHTML = "Unmute";
		} else {
			// Unmute the media
			media.muted = false;

			// Update the button text
			muteButton.innerHTML = "Mute";
		}
	});


	// Event listener for the full-screen button
	//fullScreenButton.addEventListener("click", function() {
	//	if (media.requestFullscreen) {
	//		media.requestFullscreen();
	//	} else if (media.mozRequestFullScreen) {
	//		media.mozRequestFullScreen(); // Firefox
	//	} else if (media.webkitRequestFullscreen) {
	//		media.webkitRequestFullscreen(); // Chrome and Safari
	//	}
	//});


	// Event listener for the seek bar
	seekBar.addEventListener("change", function() {
		// Calculate the new time
		var time = media.duration * (seekBar.value / 100);

		// Update the media time
		media.currentTime = time;
	});

	
	// Update the seek bar as the media plays
	media.addEventListener("timeupdate", function() {
		// Calculate the slider value
		var value = (100 / media.duration) * media.currentTime;

		// Update the slider value
		seekBar.value = value;
	});

	// Pause the media when the seek handle is being dragged
	seekBar.addEventListener("mousedown", function() {
		media.pause();
	});

	// Play the media when the seek handle is dropped
	seekBar.addEventListener("mouseup", function() {
		media.play();
	});

	// Event listener for the volume bar
	volumeBar.addEventListener("change", function() {
		// Update the media volume
		media.volume = volumeBar.value;
	});
}
