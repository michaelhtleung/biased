let content = document.getElementById("resultsContainer");
let title = document.getElementById("result-title");
let subtitle = document.getElementById("keyword");
let keyContent = document.getElementById("result-content");

let results = false;

// to be updated with how many keywords found
let keywordResults = 5;
let searchResults;
searchResults = {
  "keywords": [
    {"name" : "Environment", "content":["microsoft operated carbon neutral since 2012 and continues to reduce our emissions."]},
    {"name" : "Climate Change", "content":["Microsoft has been funding renewable energy points in Ireland and the Netherlands to prevent climate change."]},
    // {"name" : "Pollution", "content":["Microsoft relied on the use of dirty diesel generators to power the quincy facility."]},
    {"name" : "Energy", "content":["A majority of its data centers are powered by renewable energy."]},
    // {"name" : "Sustainability", "content":["Microsoft has procured renewable energy to power its data center. 60% of its data centers are powered by renewable energy."]},
  ]
};

document.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('load', setTimer);

function setTimer(){
	setTimeout(function(){
	  results=true;
	  },8000);
  myTimer = setInterval(checkResults, 200);
}

function checkResults(){
  if (results) {
    console.log("it's true!");

    title.innerHTML = "Microsoft";
    let i, j, x = "";
    for (i in searchResults.keywords) {
      x += "<h3>" + searchResults.keywords[i].name + "</h3>";
      for (j in searchResults.keywords[i].content) {
        x += searchResults.keywords[i].content[j] + "<br>";
      }
    }
    document.getElementById("result-content").innerHTML = x;
    document.getElementById("result-content").style.fontSize = "12px";
    document.getElementById("result-content").style.marginBottom = "4px";
    content.style.display = "initial";
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
