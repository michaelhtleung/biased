const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

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
 const logos = result.logoAnnotations;
 console.log('Logos:');
 logos.forEach(logo => console.log(logo));
});
