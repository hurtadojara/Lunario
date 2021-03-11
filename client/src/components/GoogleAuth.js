/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { Component } from "react"
import { Link } from "react-router-dom"
global.googleauth = "" // Google Auth object.
global.google_access_token = ""

class GoogleAuth extends Component {
  state = { isSignedIn: null }

  componentDidMount() {

      // Client ID and API key from the Developer Console
      var CLIENT_ID = '503743076427-mpo7jp1srh6dt3dnqj6220sjv3cnvvap.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyAmYZJ2c0t8IGvokKNBNxK0ueBpUpq0Ze0'

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        window.gapi.load('client:auth2', initClient);
      }
      handleClientLoad()

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          googleauth = gapi.auth2.getAuthInstance();

          googleauth.isSignedIn.listen(updateSigninStatus)

           // Handle initial sign-in state. (Determine if user is already signed in.)
      //onsole.log(google_access_token)
      setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function() {
        handleAuthClick();
      });
      $('#revoke-access-button').click(function() {
        revokeAccess();
      });
    });
  }

  function handleAuthClick() {
    if (googleauth.isSignedIn.get()) {
      // User is authorized and has clicked "Sign out" button.
      googleauth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      googleauth.signIn();
    }
  }

  function revokeAccess() {
    googleauth.disconnect();
  }

  function setSigninStatus() {
    var user = googleauth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPES);
    if (isAuthorized) {
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('You are currently signed in and have granted ' +
          'access to this app.');
          google_access_token = googleauth.currentUser.get().getAuthResponse().access_token
    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.');
    }
  }

  function updateSigninStatus() {
    setSigninStatus();
  }
  }

  render() {
    return (
      <div>
        <button id="sign-in-or-out-button">Sign In/Authorize</button>
        <button id="revoke-access-button">Revoke access</button>
        <div id="auth-status"></div>
      </div>
    )
  }
}

export default GoogleAuth