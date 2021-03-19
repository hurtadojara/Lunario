/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { Component } from "react"
import { Link } from "react-router-dom"
import EventsCalendar from "./Cal"
import myEventsList from "./FormEvent"
global.googleauth = "" // Google Auth object.
global.google_access_token = ""
var i;

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

          function listUpcomingEvents() {
            gapi.client.load('calendar', 'v3', function () {
            gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 50,
              'orderBy': 'startTime'
            }).then(function(response) {
              var events = response.result.items;
              if (events.length > 0) {
                for (i = 0; i < events.length; i++) {
                  var props = {
                  }
                  if (Date(events[i].start) === Date(events[i].end)) {
                    props.allDay = true
                  }
                  if ("summary" in events[i]) {
                    props.title = events[i].summary
                  }
                  if ("start" in events[i]) {
                    props.start = events[i].start.dateTime
                  }
                  if ("end" in events[i]) {
                    props.end = events[i].end.dateTime
                  }
                  if ("description" in events[i]) {
                    props.description = events[i].description
                  }
                  if ("location" in events[i]) {
                    props.location = events[i]
                  }
                  process.REACT_APP_MYEVENTSLIST.push(props)
                  props = {}
                }
              } else {
                alert('No upcoming events found.');
              }
            });
          });
        }     
          listUpcomingEvents();
          console.log(process.REACT_APP_MYEVENTSLIST)

    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
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
      </div>
    )
  }
}

export default GoogleAuth