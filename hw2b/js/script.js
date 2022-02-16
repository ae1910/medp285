const container = document.querySelector(".container");
let playPauseBtn = document.getElementById('play-btn');
let prevBtn = document.getElementById('back');
let nextBtn = document.getElementById('next');
let beginningBtn = document.getElementById('beginning');
let loopBtn = document.getElementById('loop');

let audioplay = document.getElementById('player');
let progress = document.getElementById('progress');
let progressContainer = document.getElementById('progressholder');


// Play/Pause songs
playPauseBtn.addEventListener("click", function() { 
    if (audioplay.paused) {
    	container.classList.add("paused");
		playPauseBtn.innerText = "pause_circle_filled";
        audioplay.play();
        }
    else  {
    	container.classList.remove("paused");
		playPauseBtn.innerText = "play_circle_filled";
        audioplay.pause();
        }
});

prevBtn.addEventListener("click", function() {
    if (audioplay.currentTime >= 10) {
    	audioplay.currentTime -= 10;
        }
    else  {
    	audioplay.currentTime = 0;
        }
});

nextBtn.addEventListener("click", function() {
    audioplay.currentTime += 10;
});

beginningBtn.addEventListener("click", function() {
    audioplay.currentTime = 0;
});

loopBtn.addEventListener("click", function() {
	if (loopBtn.style.color = '#B8B8B8') {
		loopBtn.style.color = 'white';
		if (typeof audioplay.loop == 'boolean') {
		    audioplay.loop = true;
		}
		else {
		    audioplay.addEventListener('ended', function() {
		        this.currentTime = 0;
		        this.play();
		    }, false);
		}
		
	}
	else {
		audioplay.loop = false;
		loopBtn.style.color = '#B8B8B8';
		if (audioplay.currentTime == audioplay.duration) {
	    	container.classList.remove("paused");
			playPauseBtn.innerText = "pause_circle_filled";
	        audioplay.play();
        }
	}
});

audioplay.addEventListener("timeupdate", (e)=>{
	const currentTime = e.target.currentTime; //getting playing song currentTime
	const duration = e.target.duration; //getting playing song total duration
	let progressWidth = (currentTime / duration) * 100;
	progress.style.width = `${progressWidth}%`;
	let currTime = container.querySelector(".current-time");
	let durTime = container.querySelector(".end-time");


	audioplay.addEventListener("loadeddata", ()=>{
		// update song total duration
		let audioDuration = audioplay.duration;
		let totalMin = Math.floor(audioDuration / 60);
		let totalSec = Math.floor(audioDuration % 60);
		if(totalSec < 10){ //if sec is less than 10 then add 0 before it
		  totalSec = `0${totalSec}`;
		}
		durTime.innerText = `${totalMin}:${totalSec}`;
	});

	// update playing song current time
	let currentMin = Math.floor(currentTime / 60);
	let currentSec = Math.floor(currentTime % 60);
	if(currentSec < 10){ //if sec is less than 10 then add 0 before it
	currentSec = `0${currentSec}`;
	}
	currTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressContainer.addEventListener("click", (e)=>{
	let progressWidth = progressContainer.clientWidth; //getting width of progress bar
	let clickedOffsetX = e.offsetX; //getting offset x value
	let songDuration = audioplay.duration; //getting song total duration

	audioplay.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

