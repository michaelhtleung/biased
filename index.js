let scan = document.getElementById("imageUpload");
scan.addEventListener("click", buttonPressed, false);
scan.addEventListener('input', updateValue, false);

function buttonPressed (){
  console.log("button pressed!");
}

function updateValue(e) {
  console.log("Inputted!");
  window.location.href = "results.html";
}
