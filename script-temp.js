const firebase = require("firebase");
var db = firebase.firestore();

db.collection('company').doc("script-test").set({
  name: 'aaa',
  paragraphs: 'bbb' // array of strings
});
