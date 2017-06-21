// Initialize Firebase
var config = {
  apiKey: "AIzaSyAqzIra9YkeE0HZZBSwXrjh4GemO7yVdmI",
  authDomain: "shield-88fd0.firebaseapp.com",
  databaseURL: "https://shield-88fd0.firebaseio.com",
  projectId: "shield-88fd0",
  storageBucket: "shield-88fd0.appspot.com",
  messagingSenderId: "376341346069"
};

firebase.initializeApp(config);

//initialize firebase components
const auth = firebase.auth();
var google_provider = new firebase.auth.GoogleAuthProvider();
var facebook_provider = new firebase.auth.FacebookAuthProvider();


$(document).ready(function() {

  $(document).on('click', '#login-btn', login); //登入

  $(document).on('click', '#google-log', googleLog); //Google登入

  $(document).on('click', '#facebook-log', facebookLog); //Facebook登入

  $(document).on('click', '#line-log', lineLog); //Facebook登入
});

function login(){
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email, password)
  .then(response => {
    window.location.assign("/");
  })
  .catch(error => {
    // console.log(error.message);
    showError(error.message);
  });
};

function googleLog() {
  auth.signInWithPopup(google_provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // console.log(user);

    if(user.email === null) {
      database.ref('users/' + user.uid).push({
        name: user.displayName,
        email: user.email
      });
    }


    window.location.assign("/");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function facebookLog() {
  firebase.auth().signInWithPopup(facebook_provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // console.log(user);

    if(user.email === null) {
      database.ref('users/' + user.uid).push({
        name: user.displayName,
        email: user.email
      });
    }

    window.location.assign("/");

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function lineLog() {
  var URL = 'https://access.line.me/dialog/oauth/weblogin?';
  URL += 'response_type=code';
  URL += '&client_id=1520029431';
  URL += '&redirect_uri=https://desolate-tor-67580.herokuapp.com/';
  URL += '&state=abcde';

  window.location.href = URL;
}


function showError(msg) {
  $('#log-error').hide();
  $('#log-error').text('');
  $('#log-error').append(msg);
  $('#log-error').show();
}
