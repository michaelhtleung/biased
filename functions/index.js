const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');

const Firestore = require('@google-cloud/firestore');

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

exports.helloWorld = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  res.send("Hello from Firebase!");
 });
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
 const paragraphs = crawl(company);
 saveParagraphs(paragraphs);
});

// todo: replace this mock
function crawl(companyName) {
 return ["foo", "bar", "baz"];
}

function saveParagraphs(paragraphs){
 return db.collection('company').add({
  paragraphs: paragraphs // array of strings
 })
}
