let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//Setting the width + height of the canvas to match the viewport size
canvas.width = 528;
canvas.height = 396;

let keys = [];

let player = {
	x: 231, //The x center of the canvas
	y: 165, //The y center of the canvas
	width: 66,
	height: 66,
	frameX: 0,
	frameY: 0,
	speed: 9,
	moving: false
};

//Accessing the sprite sheet;
let spriteSheet = new Image();
spriteSheet.src = "img/spritesheet.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function(e) {
	if(event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowDown' ) {
		keys[e.code] = true;
		player.moving = true;
	}
});
window.addEventListener("keyup", function(e) {
	delete keys[e.key];
	player.moving = false;
});

function movePlayer() {
	if (keys['ArrowUp'] && player.y > 5 ) { //Up Arrow
		player.y -= player.speed;
		player.frameY = 1;
		player.moving = true;
	}
	if (keys['ArrowLeft'] && player.x > 0) { //Left Arrow
		player.x -= player.speed;
		player.frameY = 2;
		player.moving = true;
	}
	if (keys['ArrowDown'] && player.y < canvas.height - player.height + 5) { //Down Arrow
		player.y += player.speed;
		player.frameY = 0;
		player.moving = true;
	}
	if (keys['ArrowRight'] && player.x < canvas.width - player.width) { //Right Arrow
		player.x += player.speed;
		player.frameY = 3;
		player.moving = true;
	}
}

function handlePlayerFrame() {
	if(player.frameX < 3 && player.moving) {
		player.frameX++;
	}
	else {
		player.frameX = 0;
	}
}
let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
	fpsInterval = 1000/fps;
	then = Date.now();
	startTime = then;
	animate();
}
function animate() {
	requestAnimationFrame(animate);
	now = Date.now();
	elapsed = now - then;
	if(elapsed > fpsInterval) {
		then = now - (elapsed % fpsInterval);
		ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears the contents of the previous frame

		//The order of the arguments = (image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight)
		drawSprite(spriteSheet, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
		movePlayer();
		handlePlayerFrame();
	}
}
startAnimating(10);