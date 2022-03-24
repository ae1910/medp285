let welcomeBtn = document.querySelector('.aboutBtn');
let title = document.querySelector('#welcome h1');
let body = document.getElementById('welcome');
welcomeBtn.addEventListener('mouseover', function() {
  document.body.style.backgroundImage = "url('img/museum.jpg')";
})
welcomeBtn.addEventListener('mouseout', function() {
  document.body.style.backgroundImage = "none";
})