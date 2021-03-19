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
        "dateTime": {
          "type": "string",
          "format": "date-time"
        },
        "timeZone": { "$ref": "#/definitions/largeEnum" }
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
      }
    },
    "attendees": {
      "title": "Attendees",
      "description": "Click on the buttoms to add or remove your attendees",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "definitions": {
    "largeEnum": {
      "type": "string",
      "enum": [
        "America/Los_Angeles",
        "United_Kingdom/London",
        "Germany/Berlin",
        "India/Mumbai",
        "Singapore/Singapore",
        "China/Beijing",
        "Japan/Tokyo",
        "Australia/Sydney",
        "New_Zeland/Auckland",
        "Colombia/Bogota",
        "United_Arab_Emirates/Dubai"
      ]
    }
  },
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
};

const uiSchema = {
  "description": {
    "classNames": "test",
    "ui:widget": "textarea"
  },
  "attendees": {
    "ui:options": {
      inputType: 'email'
    }
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
  var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'timeZone': 'America/Los_Angeles',
      'dateTime': '2015-05-28T09:00:00-07:00'
    },
    'end': {
      'dateTime': '2015-05-28T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles'
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      { 'email': 'lpage@example.com' },
      { 'email': 'sbrin@example.com' }
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 }
      ]
    }
  };
  //console.log(event)
  //console.log(formData)
  CreateEvent(formData)
  function CreateEvent(dict) {
    gapi.client.load('calendar', 'v3', function () {
      var req = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        "resource": dict
      });
      req.execute(function (event) {
        alert('Event created: ' + event.htmlLink)
        setTimeout(3000)
        if (event.htmlLink == undefined) {
          alert("Ha ingresado erroneamente los datos.\nNo se ha creado el evento.")
        }
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
            <button id="submitEvent" onClick={this.createButtom} type="submit" class="btn btn-info">Done!</button>
          </div>
        </div>
      );
    } else {
      return <h1>
        <button onClick={this.createButtom} id="uwu" class="btn btn-info btn-xs">
          Create Event
        </button>
      </h1>
    }
  }
}

export default FormEvent