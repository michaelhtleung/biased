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

exports.helloWorld = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  for (var i = 0; i < 10; i++) {
   console.log(i);
  }
 });
});

exports.identifyLogo = functions.https.onRequest((req, res) => {
 return cors(req, res, () => {
  // console logs here get printed in the server-side terminal 
  console.log("===== LOGO =====");
// google cloud vision
  const client = new vision.ImageAnnotatorClient();
  const request = req.body;

  const busboy = new Busboy({headers: req.headers});
  busboy.on('file', (fieldname, file, filename) => {
    file.on('data', (data) => {
    	// res.send(req.headers);
     res.send(data);
    });
  });
  busboy.end(req.rawBody);

  // client
  //   .logoDetection(request)
  //   .then(response => {
  //   	res.send(response);
      // const company = response.logoAnnotations[0].description.toLowerCase();
// /*      const paragraphs = crawl(company);
//       saveParagraphs(paragraphs);*/
//       res.send(company);
//     })
//     .catch(error => {
//         console.log("ERROR");
//         console.log(error);
//         res.send(error);
//     });
 }); // cors
}); // identifyLogo

// todo: replace this mock
function crawl(companyName) {
 return ["foo", "bar", "baz"];
}

function saveParagraphs(paragraphs){
 return db.collection('company').add({
  paragraphs: paragraphs // array of strings
 })
}
