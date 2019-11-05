const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const Firestore = require('@google-cloud/firestore');
const Busboy = require('busboy');
const inspect = require('util').inspect;

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
 "Anti-social", "Finance", "Boycott", "Controversial", "Technology", "Political", "Ethos", "Product",
 "Sustainability", "Organic", "Fair-trade", "Energy", "Efficient", "Vegan", "Vegetarian"];

exports.getSummary = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  const bucketName = 'yhack2019-d0dff.appspot.com';
  const fileName = req.query.filepath;
  const request = `gs://${bucketName}/${fileName}`;

  // res.send("bye");
  client
     .logoDetection(request)
     .then(response => {
     	// res.send(response);
       let obj = JSON.parse(response);
       // todo: figure out why this doesn't pluck out the company name and returns empty obj instead
       // let company = obj;
       // company = JSON.stringify(obj);
       // let company = obj[0];
       // let company = obj[0].logoAnnotations;
       // let company = obj[0].logoAnnotations[0];
       // let company = obj[0].logoAnnotations[0].description;
       // let company = obj[0].logoAnnotations[0].description.toLowerCase();
      let company = JSON.stringify(obj[0].logoAnnotations[0].description.toLowerCase());
      res.send(company);
      //  res.send( crawl(company) );	
     })
     .catch(error => {
       res.send(error);
     });
 });
});

exports.helloWorld = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  for (var i = 0; i < 10; i++) {
   console.log(i);
  }
 });
});

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
   return curated_paragraphs;
   // saveParagraphs(companyName, curated_paragraphs, done);
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
