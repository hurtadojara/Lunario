/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from 'react';
import './styles/FormEvent.css';
import Form from "react-jsonschema-form";

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
<<<<<<< HEAD
=======
        "timeZone": { "$ref": "#/definitions/largeEnum" }
      }
    },
    "lastform": {
      "title": "Recurrence",
      "type": "object",
      "properties": {
        "recurrence": {
          "$ref": "#/definitions/largeEnum"
        },
        "COUNT": {
          "type": "integer",
          "title": "Interval of days",
          "minimum": 0,
          "maximum": 31,
        }
>>>>>>> fa615cf2765d6cca3e1a7415d82007fb17337110
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
<<<<<<< HEAD
=======
   "uwu": {
    "largeEnum": {
      "type": "string",
      "enum": [
        "SECONDLY",
        "MINUTELY",
        "HOURLY",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "YEARLY"
      ]
    }
  }
>>>>>>> fa615cf2765d6cca3e1a7415d82007fb17337110
};

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

const log = (type) => console.log.bind(console, type);


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
    if (formData.start.timeZone === "America/Bogota") {
      formData.start.dateTime = formData.start.dateTime.replace(/.{5}$/, '-05:00');
      formData.end.dateTime = formData.end.dateTime.replace(/.{5}$/, '-05:00');
      formData.end.timeZone = formData.start.timeZone
    }

  }
  console.log(formData)
  CreateEvent(formData)
  function CreateEvent(dict) {
    gapi.client.load('calendar', 'v3', function () {
      var req = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        "resource": dict
      });
      req.execute(function (event) {
        if (event.htmlLink) {
        alert('Event created: ' + event.htmlLink)
        }
        setTimeout(3000)
        console.log(formData)
        if (event.htmlLink === undefined){
          alert("Ha ingresado erroneamente los datos.\nNo se ha creado el evento.")
        }
        formData = undefined
      });
    });
  }

}

class FormEvent extends React.Component {
  state = {
    show: false
  }

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
<<<<<<< HEAD
        <button onClick={this.createButtom} className="btn btn-info btn-xs">
=======
        <button onClick={this.createButtom} id="uwu" class="btn btn-info btn-xs">
>>>>>>> fa615cf2765d6cca3e1a7415d82007fb17337110
          Create Event
        </button>
      </h1>
    }
  }
}

export default FormEvent