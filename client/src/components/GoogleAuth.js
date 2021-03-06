/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { Component } from "react"
import { Link } from "react-router-dom"

export function CreateEvent(dict) {
  var request = window.gapi.calendar.events.insert({
    'calendarId': 'primary',
    'resource': dict
  });
  
  request.execute(function(event) {
    appendPre('Event created: ' + event.htmlLink);
  });
}

class GoogleAuth extends Component {
  state = { isSignedIn: null }

  componentDidMount() {

      // Client ID and API key from the Developer Console
      var CLIENT_ID = '503743076427-mpo7jp1srh6dt3dnqj6220sjv3cnvvap.apps.googleusercontent.com';

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        window.gapi.load('client:auth2', initClient);
      }
      handleClientLoad();

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        window.gapi.client.init({
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          //listUpcomingEvents();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
    }

  render() {
    return (
      <div>
      <Link to="/" className="item">
        <button id="authorize_button">Authorize</button>
        <button id="signout_button">Sign Out</button>
      </Link>
      </div>
    )
  }
}

export default GoogleAuth