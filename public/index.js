// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAj-dMoGDQVJNjQE3042RowBnmy3DLklc0",
  authDomain: "yhack2019-d0dff.firebaseapp.com",
  databaseURL: "https://yhack2019-d0dff.firebaseio.com",
  projectId: "yhack2019-d0dff",
  storageBucket: "yhack2019-d0dff.appspot.com",
  messagingSenderId: "270946571259",
  appId: "1:270946571259:web:35357e27162da02913b15e",
  measurementId: "G-ZF035ZH907"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Elements that are pages
let scanPage = document.getElementById("scanPage");
let loadPage = document.getElementById("loadPage");
let resultsPage = document.getElementById("resultsPage");

// Elements within pages
let title = document.getElementById("result-title");
let keyContent = document.getElementById("result-content");
let scan = document.getElementById("imageUpload");
let fileUpload = document.getElementById("imageUpload");

// GCP Cloud Service(s)
let storageRef = firebase.storage().ref('photos/myPictureName');

// Event Listener(s) and Event Handler(s)
fileUpload.addEventListener('change', function(evt) {
  // change pages
  scanPage.style.display = 'none';
  loadPage.style.display = 'initial';
  let firstFile = evt.target.files[0]; // upload the first file only
  let uploadTask = storageRef.put(firstFile).then( () => {
    //  make ajax call to cloud function here
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", (event) => {
      // console logs here get printed in the client-side browser
      console.log('callback invoked');
      console.log(event);
      console.log(event.target.response);
      let responseObj = JSON.parse(event.target.response);

      // change pages
      loadPage.style.display = 'none';
      resultsPage.style.display = 'initial';

      // dynamically load in data to results.html
      if (responseObj.company) {
        title.innerHTML = responseObj.company;
        document.getElementById("result-content-0").innerHTML = responseObj.paragraphs[0];
        document.getElementById("result-content-1").innerHTML = responseObj.paragraphs[1];
        document.getElementById("result-content-2").innerHTML = responseObj.paragraphs[2];
      } else {
        title.innerHTML = "Could not identify Logo";
        document.getElementById("result-error-CTA").innerHTML = "Try Again?";
      }
    }, false);
    let url = 'https://us-central1-yhack2019-d0dff.cloudfunctions.net/getSummary';
    let filepath = '/photos/myPictureName';
    ajax.open("GET", url + "?filepath=" + filepath);
    ajax.send();
  });
});
