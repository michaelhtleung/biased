const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');

const Firestore = require('@google-cloud/firestore');

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
 "Anti-social", "Finance", "Boycott", "Controversial", "Technology", "Political", "Ethos", "Product",
 "Sustainability", "Organic", "Fair-trade", "Energy", "Efficient", "Vegan", "Vegetarian"];

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.transferImage = functions.https.onRequest((req, res) => {
 console.log("===== IMAGE =====");
 res.send("Image received!");
});

exports.identifyLogo = functions.storage.object().onFinalize(async (object) => {
 const bucketName = 'yhack2019-d0dff.appspot.com';
 const fileName = '/photos/myPictureName';

 const [result] = await client.logoDetection(`gs://${bucketName}/${fileName}`);

 const company = result.logoAnnotations[0].description.toLowerCase();
 crawl(company);
});

crawl("google");

function saveParagraphs(name, paragraphs, callback){
 db.collection('company').doc("TEST").set({
  name: 'CCC',
  paragraphs: 'DDD' // array of strings
  // name: name,
  // paragraphs: paragraphs // array of strings
 }).then( () => {
  console.log("Paragraphs saved");
  return callback();
 }).catch( (err) => {
  if (err) throw err;
  console.log("Failure saving");
  return callback();
 });
}

function crawl(companyName) {
 var Crawler = require("crawler");
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
   saveParagraphs(companyName, curated_paragraphs, done);
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
    foundKeywordsArray = paragraphArray[i]
    console.log(foundKeywordsArray + "\n")
   }
  }
 }
 return foundKeywordsArray;
}
