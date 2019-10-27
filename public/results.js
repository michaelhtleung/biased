let content = document.getElementById("resultsContainer");
let loadingGif = document.getElementById("loadingGif");
let title = document.getElementById("result-title");
let subtitle = document.getElementById("keyword");
let keyContent = document.getElementById("result-content");

let results = false;

// to be updated with how many keywords found
let keywordResults = 5;
let searchResults;
searchResults = {
  "keywords": [
    {"name" : "keyword1", "content":["hey hello", "This is some content"]},
    {"name" : "keyword2", "content":["hey hello", "This is some content", "look at that content!"]},
    {"name" : "keyword3", "content":[]},
    {"name" : "keyword4", "content":["hey hello", "This is some content"]},
    {"name" : "keyword5", "content":["hey hello"]},
  ]
};

document.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('load', setTimer);

function setTimer(){
  myTimer = setInterval(checkResults, 200);
}

function checkResults(){
  if (results) {
    console.log("it's true!");

    title.innerHTML = "[company title]";
    let i, j, x = "";
    for (i in searchResults.keywords) {
      x += "<h3>" + searchResults.keywords[i].name + "</h3>";
      for (j in searchResults.keywords[i].content) {
        x += searchResults.keywords[i].content[j] + "<br>";
      }
    }
    document.getElementById("result-content").innerHTML = x;
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
