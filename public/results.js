let content = document.getElementById("container");
let loadingGif = document.getElementById("loadingGif");
let results = false;

document.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('load', setTimer);

function setTimer(){
  myTimer = setInterval(checkResults, 200);
}

function checkResults(){
  if (results) {
    console.log("it's true!");
    content.style.display = "initial";
    loadingGif.style.display = "none";
    clearInterval(myTimer);
  } else {
    content.style.display = "none";
  }
  console.log(results);
}

function keyDownHandler(){
  results = true;
  console.log("pressed!", results);
}
