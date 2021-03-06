const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const Firestore = require('@google-cloud/firestore');
const Busboy = require('busboy');
const inspect = require('util').inspect;
const Crawler = require("crawler");

const cors = require('cors')({
 origin: true,
});

// google firestore
const db = new Firestore({
 projectId: 'yhack2019-d0dff',
 keyFilename: '../yhack2019-d0dff-8f89db8e95e5.json'
});

// google cloud vision
const client = new vision.ImageAnnotatorClient();

// global vars
var keywordArray = ["Animal testing", "Factory farming", "Animal rights", "Cruelty", "Environment", "Climate change",
 "Pollution", "Toxin", "Habitats", "Resources", "Palm oil", "Human rights", "Irresponsible", "Military",
 "Anti-social", "Finance", "Boycott", "Controversial", "Political", "Ethos",
 "Sustainability", "Organic", "Fair-trade", "Energy", "Efficient", "Vegan", "Vegetarian", "Controversy", "Controversial",
"Unethical"];

exports.getSummary = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  const bucketName = 'yhack2019-d0dff.appspot.com';
  const fileName = req.query.filepath;
  const request = `gs://${bucketName}/${fileName}`;

  client
     .logoDetection(request)
     .then(response => {
      let company = response[0].logoAnnotations[0].description.toLowerCase();
      crawl(company, (error, result) => {
       return res.send({
        company: company,
        paragraphs: result
       });
      });
     })
     .catch(error => {
       return res.send(error);
     });
 });
});

function crawl(companyName, smallback) {
 var c = new Crawler({
  maxConnections: 10,
  callback: function (error, res, done) {
   var paragraphArray;
   if (error) {
    console.log(error);
   } else {
    var $ = res.$;
    paragraphArray = $("p").text().split("\n")
   }
   let curated_paragraphs = checkForKeywords(paragraphArray);
   return smallback(null, curated_paragraphs);
  }
 });
 // Queue just one URL, with default callback
 c.queue('https://en.wikipedia.org/wiki/' + companyName);
}

function checkForKeywords(paragraphArray) {
 let foundKeywordsArray = new Array();
 for (var i = 0; i < paragraphArray.length; i++) {
  for (var j = 0; j < keywordArray.length; j++) {
   if ((paragraphArray[i].includes(keywordArray[j]) || (paragraphArray[i].includes(keywordArray[j].toLowerCase())))) {
    foundKeywordsArray.push(paragraphArray[i]);
    if (foundKeywordsArray.length >= 3) {
     return foundKeywordsArray;
    }
   }
  }
 }
}
