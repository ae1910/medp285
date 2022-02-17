let color;
let size;
let increaseBtn = document.getElementById("increase");
let decreaseBtn = document.getElementById("decrease");
let redBtn = document.getElementById("red");
let greenBtn = document.getElementById("green");
let blueBtn = document.getElementById("blue");
let colorBtn = document.getElementById("color");
let para = document.getElementById('p2');
let r = 0;
let g = 0;
let b = 0;

color = 'green';
size = 75;

para.style.color = color;
para.style.fontSize = size + 'px';
//This is a string because what is in "" is understood by the CSS

increaseBtn.addEventListener("click", function(){
	size++; //size = size+1;
	para.style.fontSize = size + "px";
})
decreaseBtn.addEventListener("click", function(){
	size--; //size = size+1;
	para.style.fontSize = size + "px";
	if(size <= 1) {
		size = 2;
	}
})

redBtn.addEventListener("click", function(){
	r = r + 10;
	para.style.color = "rgb" + "(" + r + ", 0, 0)";
})
greenBtn.addEventListener("click", function(){
	g = g + 10;
	para.style.color = "rgb" + "(0," + g + ", 0)";
})
blueBtn.addEventListener("click", function(){
	b = b + 10;
	para.style.color = "rgb" + "(0, 0, " + b + ")";
})
colorBtn.addEventListener("click", function(){
	r = r + 10;
	g = g + 4;
	b = b + 8;
	para.style.color = "rgb" + "(" + r + ", " + g + ", " + b + ")";
})