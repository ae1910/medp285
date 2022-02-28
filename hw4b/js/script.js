let searchBtn = document.querySelector('button');
let container = document.getElementById('container');
let nPara = document.querySelector('.para');
let header = document.querySelector('.header');
let hex = document.getElementById('hex');
let rgb = document.getElementById('rgbs');
let r = 0;
let g = 0;
let b = 0;

function randomNum(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
} 

function getInputValue(){
	// Selecting the input element and get its value 
	let inputVal = document.getElementById("myInput").value;

	let color = inputVal;

	switch (color) {
		case 'pink':
		case 'Pink':
			r = randomNum(90, 256);
			b = randomNum(50, r);
			g = b - randomNum(10, b);
			if(b >= 160 && g >= 130) {
				header.style.color = 'black';
				nPara.style.color = 'black';
				hex.style.color = 'black';
				rgb.style.color = 'black';
			}
			else{
				header.style.color = 'white';
				nPara.style.color = 'white';
				hex.style.color = 'white';
				rgb.style.color = 'white';
			}
			document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`; //Uses backticks(``) instead of the quotations('' / "")
			break;
		case 'red':
		case 'Red':
			r = randomNum(15, 256);
			g = 0;
			b = 0;
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			break;
		case 'orange':
		case 'Orange':
			r = randomNum(220, 256);
			g = randomNum(60,200);
			b = g - randomNum(0, g);
			if(b >= 100) {
				header.style.color = 'black';
				nPara.style.color = 'black';
				hex.style.color = 'black';
				rgb.style.color = 'black';
			}
			else{
				header.style.color = 'white';
				nPara.style.color = 'white';
				hex.style.color = 'white';
				rgb.style.color = 'white';
			}
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			break;
		case 'yellow':
		case 'Yellow':
			r = randomNum(180, 256);
			g = randomNum(180, r);
			b = randomNum(0, 170);
			if(b >= 100 || g >= 200) {
				header.style.color = 'black';
				nPara.style.color = 'black';
				hex.style.color = 'black';
				rgb.style.color = 'black';
			}
			else{
				header.style.color = 'white';
				nPara.style.color = 'white';
				hex.style.color = 'white';
				rgb.style.color = 'white';
			}
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			break;
		case 'green':
		case 'Green':
			r = 0;
			g = randomNum(15, 256);
			b = 0;
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			break;
		case 'blue':
		case 'Blue':
			r = 0;
			g = 0;
			b = randomNum(15, 256);
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			break;
		case 'purple':
		case 'Purple':
			b = randomNum(90, 256);
			r = randomNum(50, b);
			g = r - randomNum(10, r);
			if(r >= 160 && g >= 130) {
				header.style.color = 'black';
				nPara.style.color = 'black';
				hex.style.color = 'black';
				rgb.style.color = 'black';
			}
			else{
				header.style.color = 'white';
				nPara.style.color = 'white';
				hex.style.color = 'white';
				rgb.style.color = 'white';
			}
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			break;
		case 'grey':
		case 'gray':
		case 'Grey':
		case 'Gray':
			r = randomNum(15, 248);
			g = r;
			b = r;
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			if(r >= 160) {
				header.style.color = 'black';
				nPara.style.color = 'black';
				hex.style.color = 'black';
				rgb.style.color = 'black';
			}
			else{
				header.style.color = 'white';
				nPara.style.color = 'white';
				hex.style.color = 'white';
				rgb.style.color = 'white';
			}
			break;
		case 'black':
		case 'Black':
			r = randomNum(0, 15);
			g = randomNum(0, 15);
			b = randomNum(0, 15);
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			break;
		case 'white':
		case 'White':
			r = randomNum(248, 256);
			g = randomNum(248, 256);
			b = randomNum(248, 256); 
			document.body.style.backgroundColor = "rgb" + "(" + r + ", " + g + ", " + b + ")";
			header.style.color = "black";
			nPara.style.color = "black";
			hex.style.color = "black";
			rgb.style.color = "black";
			break;
	}
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

searchBtn.addEventListener('click', function(){
	hex.innerHTML = `HEX: ${rgbToHex(r, g, b)}`;
	rgb.innerHTML = `RGB: ${r}, ${g}, ${b}`;
})