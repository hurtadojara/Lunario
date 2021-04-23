/* This section contains the jsonschema Form that is used to create an event on the calendar,
   on the same time you can visualize the event on all the calendar associated to the user account*/
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from 'react';
import './styles/FormEvent.css';
import Form from "react-jsonschema-form";
import {listUpcomingEvents, REACT_APP_MYEVENTSLIST} from './GoogleAuth'

/* Define the structure of the jsonschema Form*/
const schema = {
  "type": "object",
  required: [
    "summary", "location"
  ],
  "properties": {
    "summary": { "type": "string", "title": "Summary", "default": "Add a title" },
    "location": { "type": "string", "title": "Location", "default": " " },
    "description": { "type": "string", "title": "Description", "default": "Add description" },
    "start": {
      "title": "Start date",
      "description": "Add a time",
      "type": "object",
      "properties": {
        "timeZone": { "$ref": "#/definitions/largeEnum" },
        "dateTime": {
          "type": "string",
          "format": "date-time"
        },
      }
    },
    "end": {
      "title": "End date",
      "description": "Add a valid end time",
      "type": "object",
      "properties": {
        "dateTime": {
          "type": "string",
          "format": "date-time"
        },
      }
    },
    "attendees": {
      "title": "Attendees",
      "description": "attendees separated by a comma, except the last one",
      "type": "string",
    }
  },
  "definitions": {
    "largeEnum": {
      "type": "string",
      "enum": [
        "America/Los_Angeles",
        "United_Kingdom/London",
        "Europe/Berlin",
        "India/Mumbai",
        "Singapore/Singapore",
        "China/Beijing",
        "Japan/Tokyo",
        "Australia/Sydney",
        "New_Zeland/Auckland",
        "America/Bogota",
        "United_Arab_Emirates/Dubai"
      ]
    }
  },
};

/* Define part of the style of the jsonschema Form*/
const uiSchema = {
  "description": {
    "classNames": "test",
    "ui:widget": "textarea"
  },
  "start": {
    "dateTime": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        "yearsRange": [
          2021,
          2080
        ]
      }
    }
  },
  "end": {
    "dateTime": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        "yearsRange": [
          2021,
          2080
        ]
      }
    }
  }
}

/* Catch the type of log:
   -onChange: if some value of the jsonform was changed via HTTP request
   -onSubmit: get a dictionary with the values of the form
   -onError: handle the errors that may occur with the json*/
const log = (type) => console.log.bind(console, type);

/* Create an event via Google Calendar API*/
function CreateEvent(dict) {
  gapi.client.load('calendar', 'v3', function () {
    var req = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      "resource": dict
    });
    req.execute(function (event) {
      console.log('Event created: ' + event.htmlLink);
    });
  });
}

/* Store the data of the jsonForm and save the emails data on a list of dicts*/
const onSubmit = ({ formData }, e) => handleEvent(formData);
function handleEvent(formData) {
    if (formData.attendees) {
    var inv = []
    var finalAttendees = [{}]
    var initstring = "\{\"email\":\""
    var laststring = "\"\}"
    formData.attendees = formData.attendees.replace(/\s+/g, '');
    inv = formData.attendees.split(',')
    for(var invited of inv) {
      var mail = invited
      var jText = initstring + mail + laststring
      inv[invited] = JSON.parse(jText)
      finalAttendees.push(inv[invited])
    }
    finalAttendees.shift()
    formData.attendees = finalAttendees
    console.log(formData.attendees)
  }
  // HERE WE FORMAT THE DATE TO CREATE THE 
  // EVENT ON APPROPIATE DTIME                                                  
//var arr =  {"America/Los_Angeles",
 // "United_Kingdom/London",
 // "Germany/Berlin",
 // "India/Mumbai",
 // "Singapore/Singapore",
  //"China/Beijing",
  //"Japan/Tokyo",
  //"Australia/Sydney",
  //"New_Zeland/Auckland",
  //"Colombia/Bogota",
  //"United_Arab_Emirates/Dubai"
//}

/* Guarantees the correct format of the time zone */
  if (formData.start.timeZone !== undefined) {

    if (formData.start.timeZone === "America/Bogota") {
      formData.start.dateTime = formData.start.dateTime.replace(/.{5}$/, '-05:00');
      formData.end.dateTime = formData.end.dateTime.replace(/.{5}$/, '-05:00');
      formData.end.timeZone = formData.start.timeZone
    }
    if (formData.start.timeZone === "America/Los_Angeles") {
      formData.start.dateTime = formData.start.dateTime.replace(/.{5}$/, '-07:00');
      formData.end.dateTime = formData.end.dateTime.replace(/.{5}$/, '-07:00');
      formData.end.timeZone = formData.start.timeZone
    }
    if (formData.start.timeZone === "ZONA HORARIA CUALQUIER LUGAR") {
      formData.start.dateTime = formData.start.dateTime.replace(/.{5}$/, '-05:00');
      formData.end.dateTime = formData.end.dateTime.replace(/.{5}$/, '-05:00');
      formData.end.timeZone = formData.start.timeZone
    }

  }
  console.log(formData)
  /* - Runs the client of Google Calendar v3, insert the event in the correct format,
       make a request with a delay of 3000ms and handle errors.
     - Catch the 10 first upcoming events*/
  CreateEvent(formData)
  function CreateEvent(dict) {
    gapi.client.load('calendar', 'v3', function () {
      var req = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        "resource": dict
      });
      req.execute(function (event) {
        if (event.htmlLink) {
        alert('Event created!')
        }
        setTimeout(3000)
        console.log(formData)
        if (event.htmlLink === undefined){
          alert("Missing or incorrect data.\nthe event has not been created.")
        }
        process.REACT_APP_MYEVENTSLIST = [{}]
        listUpcomingEvents()
        formData = undefined
      });
    });
  }
}

/* Extend react component to a class, this class is render with the calendar*/
class FormEvent extends React.Component {
  state = {
    show: false
  }

/* The code below render a div with the jsonschema Form, the schema is deploy by
    a button "Create event, when is submitted an event the "submit" button closes
    the form.*/
  createButtom = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    if (this.state.show) {
      return (
        <div id="eventDesing">
          Fill the form
          <p></p>
          <Form schema={schema}
            onSubmit={onSubmit}
            onError={log("errors")}
            uiSchema={uiSchema} />
          <div id="submit-btn">
            <button id="submitEvent" onClick={this.createButtom} type="submit" className="btn btn-info">Done!</button>
          </div>
        </div>
      );
    } else {
      return <h1>
        <button onClick={this.createButtom} id="uwu" className="btn btn-info btn-xs">
          Create Event
        </button>
      </h1>
    }
  }
}

export default FormEvent